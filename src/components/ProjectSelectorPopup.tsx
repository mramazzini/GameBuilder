// FolderSelectionPopup.tsx

import React, { useState } from "react";

interface FolderSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (folderName: string) => void;
}

const FolderSelectionPopup: React.FC<FolderSelectionPopupProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [folderName, setFolderName] = useState("");

  const handleSelect = () => {
    // You can perform additional validation or checks here if needed
    onSelect(folderName);
    onClose();
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px",
          }}
        >
          <h2>Select a Folder</h2>
          <input
            type='text'
            placeholder='Folder name'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button onClick={handleSelect}>Select</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default FolderSelectionPopup;
