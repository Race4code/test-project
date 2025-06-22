import { useState } from 'react';

const flattenItems = (items, parentPath = []) => {
  let flat = [];
  for (const item of items) {
    const path = [...parentPath, item];
    flat.push({ id: item.itemID, name: path.map(p => p.itemName).join(' > '), path });
    if (item.childs.length > 0) {
      flat = flat.concat(flattenItems(item.childs, path));
    }
  }
  return flat;
};

const insertProject = (items, parentId, newProject) => {
  return items.map(item => {
    if (item.itemID === parentId) {
      return {
        ...item,
        childs: [...item.childs, newProject]
      };
    }
    return {
      ...item,
      childs: insertProject(item.childs, parentId, newProject)
    };
  });
};

// const AddProjectModal = ({ navItems, setNavItems, onClose }) => {
//   const [projectName, setProjectName] = useState('');
//   const [parentId, setParentId] = useState('');

//   const flatOptions = flattenItems(navItems);

//   const handleAdd = () => {
//     if (!projectName || !parentId) return;
//     const newProject = {
//       itemName: projectName,
//       itemID: Date.now().toString(),
//       childs: []
//     };
//     const updated = insertProject(navItems, parentId, newProject);
//     setNavItems(updated);
//     onClose();
//   };

//   return (
//     // <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
//     <div className='fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50'>
//       <div className='bg-white p-6 rounded-lg w-[400px]'>
//         <h2 className='text-xl font-bold mb-4'>Add New Project</h2>
//         <div className='mb-4'>
//           <label className='block mb-1 font-medium'>Parent Project</label>
//           <select
//             className='w-full border px-2 py-1 rounded'
//             value={parentId}
//             onChange={(e) => setParentId(e.target.value)}
//           >
//             <option value=''>Select parent</option>
//             <option value='Project'>Project</option>
//             {flatOptions.map((opt) => (
//               <option key={opt.id} value={opt.id}>
//                 {opt.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className='mb-4'>
//           <label className='block mb-1 font-medium'>Project Name</label>
//           <input
//             className='w-full border px-2 py-1 rounded'
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//             placeholder='Enter project name'
//           />
//         </div>
//         <div className='flex justify-end gap-2'>
//           <button onClick={onClose} className='px-4 cursor-pointer py-2 bg-gray-300 rounded hover:bg-gray-400'>
//             Cancel
//           </button>
//           <button onClick={handleAdd} className='px-4 cursor-pointer py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
//             Add
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProjectModal;


const AddProjectModal = ({ navItems, setNavItems, onClose }) => {
  const [projectName, setProjectName] = useState('');
  const [parentId, setParentId] = useState(navItems.length === 0 ? 'ROOT' : '');

  const flatOptions = flattenItems(navItems);

  const handleAdd = () => {
    if (!projectName || !parentId) return;
    const newProject = {
      itemName: projectName,
      itemID: Date.now().toString(),
      childs: []
    };

    if (parentId === 'ROOT') {
      // First or root-level project
      setNavItems([...navItems, newProject]);
    } else {
      const updated = insertProject(navItems, parentId, newProject);
      setNavItems(updated);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add New Project</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Parent Project</label>
          <select
            className="w-full border px-2 py-1 rounded"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            {navItems.length === 0 && (
              <option value="ROOT">Projects (Root)</option>
            )}
            {navItems.length > 0 && (
              <>
                <option value="">Select parent</option>
                <option value="ROOT">Projects (Root)</option>
                {flatOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Project Name</label>
          <input
            className="w-full border px-2 py-1 rounded"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};


export default AddProjectModal;