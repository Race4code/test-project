import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Trash2 } from 'lucide-react'

const TreeItem = ({ item, level = 0, onDeleteClick }) => {
  const [isOpen, setIsOpen] = useState(true)
  const hasChildren = item.childs && item.childs.length > 0

  return (
    <div className={`pl-${level * 4} py-1`}>
      <div
        className="flex items-center justify-between hover:bg-gray-100 px-2 py-1 rounded-md"
      >
        <div
          className="flex items-center cursor-pointer w-full"
          onClick={() => hasChildren && setIsOpen(!isOpen)}
        >
          {hasChildren && (
            <span className="mr-1">
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
          <span>{item.itemName}</span>
        </div>
        <button
          onClick={() => onDeleteClick(item)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {hasChildren && isOpen && (
        <div className="ml-4">
          {item.childs.map((child) => (
            <TreeItem
              key={child.itemID}
              item={child}
              level={level + 1}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const findProjectById = (items, id) => {
  for (const item of items) {
    if (item.itemID === id) return item
    const found = findProjectById(item.childs, id)
    if (found) return found
  }
  return null
}

const Main = ({ navItems, selectedProjectID, onDeleteProject }) => {
  const [confirmModal, setConfirmModal] = useState({ open: false, project: null });
  

  const projectToShow =
    selectedProjectID == null
      ? navItems
      : findProjectById(navItems, selectedProjectID)
        ? [findProjectById(navItems, selectedProjectID)]
        : []

  const handleDeleteClick = (project) => {
    setConfirmModal({ open: true, project });
  }


  const confirmDelete = () => {
  const projectID = confirmModal.project?.itemID;
  console.log("Trying to delete:", projectID);
  if (projectID) {
    onDeleteProject(projectID);
    setConfirmModal({ open: false, project: null });
  }
};

  return (
    <div className="w-full min-h-screen flex flex-col p-6 px-5  relative">
      <h1 className="text-2xl font-bold mb-4">
        {selectedProjectID ? 'Selected Project' : 'All Projects'}
      </h1>

      {projectToShow.length === 0 ? (
        <p className="text-gray-500">No project selected or not found.</p>
      ) : (
        projectToShow.map((item) => (
          <TreeItem
            key={item.itemID}
            item={item}
            onDeleteClick={handleDeleteClick}
          />
        ))
      )}

      {/* Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete{' '}
              <span className="font-semibold">{confirmModal.project?.itemName}</span> and all its child projects?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmModal({ open: false, project: null })}
                className="px-4 py-2 bg-gray-300 cursor-pointer rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Main
