import React, { useState } from "react";
import { ReactComponent as UserIcon } from "../../assets/userIcon.svg";
import { ReactComponent as UserProfile } from "../../assets/user_profile.svg";
import { ReactComponent as UserRoles } from "../../assets/user_roles.svg";
import { ReactComponent as PackagePlus } from "../../assets/package-plus.svg";
import { ReactComponent as Leads } from "../../assets/lead_tracking.svg";
import "./SideNavBar.scss";

const Sidebar = ({ onMenuClick, activeIndex, isCompact }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState(null);
  const [menuItems, setMenuItems] = useState([
    {
      label: "Account",
      icon: <UserIcon />,
      component: <div>Profile Section</div>,
      dropdown: [
        { label: "Account Profile Section", icon: <UserProfile /> },
        { label: "Account Settings Section", icon: <PackagePlus /> },
        { label: "Acccount Logout Section", icon: <UserRoles /> },
      ],
    },
    {
      label: "Manage Users", icon: <UserProfile />, component: "Manage Users",
      dropdown: [
        { label: "User Profile Section", icon: <UserProfile /> },
        { label: "User Settings Section", icon: <PackagePlus /> },
        { label: "User Logout Section", icon: <UserRoles /> },
      ],
    },
    {
      label: "Leads Portal", icon: <Leads />, component: "Manage Users",
      dropdown: [
        { label: "Leads Profile Section", icon: <UserProfile /> },
        { label: "Leads Settings Section", icon: <PackagePlus /> },
        { label: "Leads Logout Section", icon: <UserRoles /> },
      ],
    },
  ]);

  const handleMenuItemClick = (index, item) => {
    if (item.dropdown) {
      setExpandedIndex(expandedIndex === index ? null : index);
    } else {
      onMenuClick(item.component, index);
    }
  };

  const handleDropdownClick = (menuIndex, dropdownIndex) => {
    setSelectedDropdownIndex({ menuIndex, dropdownIndex });
    setModalVisible(true); // Show the modal
  };

  const handleModalAction = (action) => {
    const { menuIndex, dropdownIndex } = selectedDropdownIndex;
    const updatedMenuItems = [...menuItems];

    if (action === "copy") {
      // Copy the dropdown item and add it to the list
      const copiedItem = {
        ...updatedMenuItems[menuIndex].dropdown[dropdownIndex],
        label: `${updatedMenuItems[menuIndex].dropdown[dropdownIndex].label} (Copy)`,
      };
      updatedMenuItems[menuIndex].dropdown.splice(dropdownIndex + 1, 0, copiedItem);
    } else if (action === "delete") {
      // Remove the dropdown item
      updatedMenuItems[menuIndex].dropdown.splice(dropdownIndex, 1);
    } else if (action === "rename") {
      // Rename the dropdown item
      const newLabel = prompt(
        "Enter new label:",
        updatedMenuItems[menuIndex].dropdown[dropdownIndex].label
      );
      if (newLabel) {
        updatedMenuItems[menuIndex].dropdown[dropdownIndex].label = newLabel;
      }
    }

    setMenuItems(updatedMenuItems);
    setModalVisible(false); // Close the modal
  };

  return (
    <div className={`sidebar ${isCompact ? "compact" : ""}`}>
      {!isCompact && (
        <>
          <div className="sidebar-header">
            <h2>Sidebar Section</h2>
          </div>
        </>
      )}
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            <div
              className={`menu-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleMenuItemClick(index, item)}
            >
              <span>{item.icon}</span>
              {!isCompact && item.label}
            </div>
            {expandedIndex === index && item.dropdown && (
              <ul className="dropdown-menu">
                {item.dropdown.map((dropdownItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="dropdown-item"
                    onClick={() => handleDropdownClick(index, subIndex)}
                  >
                    <span className="dropdown-icon">{dropdownItem.icon}</span>
                    {dropdownItem.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Modal for dropdown item actions */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              Action for:{" "}
              {menuItems[selectedDropdownIndex.menuIndex].dropdown[selectedDropdownIndex.dropdownIndex].label}
            </h3>
            <button onClick={() => handleModalAction("copy")}>Copy</button>
            <button onClick={() => handleModalAction("delete")}>Delete</button>
            <button onClick={() => handleModalAction("rename")}>Rename</button>
            <button onClick={() => setModalVisible(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
