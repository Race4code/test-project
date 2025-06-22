import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const TreeItem = ({ item, level = 0, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.childs && item.childs.length > 0

  return (
    <div className={`pl-${level * 4} py-1`}>
      <div
        className="flex items-center cursor-pointer px-2 py-1 rounded-md"
        onClick={() => {
          // if (hasChildren) setIsOpen(!isOpen)
          onSelect(item.itemID)
        }}
      >
        {hasChildren && (
          <span 
            className="mr-1 hover:bg-gray-600 p-1 rounded-sm"
            onClick={() => {
              if (hasChildren) setIsOpen(!isOpen)
              // onSelect(item.itemID)
            }}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        <span className='hover:bg-gray-700 mx-1 px-2 py-1 rounded-sm'>{item.itemName}</span>
      </div>
      {hasChildren && isOpen && (
        <div className="ml-4">
          {item.childs.map((child) => (
            <TreeItem key={child.itemID} item={child} level={level + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

const Sidebar = ({ isSideBarCollapsed, setIsSideBarCollapsed, navItems, setSelectedProjectID }) => {
  const [isRootOpen, setIsRootOpen] = useState(true)

  return (
    <div className="w-[20%] h-full bg-gray-800 text-white border-r overflow-y-auto fixed">
      <p className="text-2xl font-bold text-center py-4 border-b border-gray-700">VAST AI</p>
      <div className="p-2">
        <div
          className="flex items-center cursor-pointer px-2 py-1 rounded-md"
          onClick={() => setSelectedProjectID(null)}
          >
          <span 
            className="mr-1 hover:bg-gray-700 rounded-sm cursor-pointer p-1"
            onClick={() => setIsRootOpen(!isRootOpen)}
          >
            {isRootOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
          <span className="font-semibold hover:bg-gray-700 mx-1 px-2 py-1 rounded-sm">Projects</span>
        </div>

        {isRootOpen && (
          <div className="ml-4">
            {navItems.length === 0 ? (
              <p className="text-sm text-gray-400 mt-2">No Projects</p>
            ) : (
              navItems.map((item) => (
                <TreeItem key={item.itemID} item={item} onSelect={setSelectedProjectID} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}



export default Sidebar;
