import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'
import Main from './Pages/Main'
import AddProjectModal from './Components/AddProjectModal'

const initialProjects = [ 
  /* same as before */ 
  {
    itemID:"1",
    itemName:"Proejct 1",
    childs:[
      {
        itemID:"2",
        itemName:"Proejct 1.1",
        childs:[
          {
            itemID:"21",
            itemName:"Proejct 1.1.1",
            childs:[
              {
                itemID:"22",
                itemName:"A very loooonnngg project nameeeee",
                childs:[],
              }
            ],
          }
        ],
      }
    ]
  },
  {
    itemID:"20",
    itemName:"Proejct 2",
    childs:[
      {
        itemID:"3",
        itemName:"Proejct 2.1",
        childs:[
          {
            itemID:"5",
            itemName:"Proejct 2.1.1",
            childs:[]
          }
        ]
      },
      {
        itemID:"3",
        itemName:"Proejct 2.1",
        childs:[]
      },
    ]
  },
  {
    itemID:"7",
    itemName:"Project North India",
    childs : [
      {
        itemID:"8",
        itemName:"Delhi West",
        childs : []
      },
      {
        itemID:"9",
        itemName:"Delhi East",
        childs : []
      },
      {
        itemID:"10",
        itemName:"Chandigargh",
        childs:[]
      }
    ]
  },
  {
    itemID:"25",
    itemName:"Project East India",
    childs : [
      {
        itemName:"Kolkata Central",
        itemID:"26",
        childs:[]
      },
      {
        itemName:"Patna",
        itemID : "27",
        childs:[]
      }
    ]
  },
  {
    itemID:"28",
    itemName:"Project South India",
    childs : [
      {
        itemName:"Chennai Central",
        itemID:"29",
        childs:[]
      },
      {
        itemName:"Bangalore",
        itemID : "29",
        childs:[]
      }
    ]
  },
  {
    itemID:"30",
    itemName:"Project West India",
    childs : [
      {
        itemName:"GandhiNagar",
        itemID:"31",
        childs:[]
      },
      {
        itemName:"Surat",
        itemID : "32",
        childs:[]
      }
    ]
  }
]

function App() {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false)
  const [navItems, setNavItems] = useState(initialProjects)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProjectID, setSelectedProjectID] = useState(null)

  const deleteProjectById = (items, idToDelete) => {
  return items
    .filter(item => item.itemID !== idToDelete)
    .map(item => ({
      ...item,
      childs: deleteProjectById(item.childs, idToDelete),
    }));
};

const moveAndEditProject = (items, targetId, updatedProject, newParentId) => {
  let removed = null;

  const remove = (list) =>
    list
      .map((item) => {
        if (item.itemID === targetId) {
          removed = item;
          return null;
        }
        const newChilds = remove(item.childs);
        return { ...item, childs: newChilds };
      })
      .filter(Boolean);

  const add = (list) =>
    list.map((item) => {
      if (item.itemID === newParentId) {
        return { ...item, childs: [...item.childs, { ...removed, ...updatedProject }] };
      }
      return { ...item, childs: add(item.childs) };
    });

  // Remove first
  let reduced = remove(items);

  // Add back under new parent or at root
  if (newParentId === 'ROOT') {
    reduced.push({ ...removed, ...updatedProject });
  } else {
    reduced = add(reduced);
  }

  return reduced;
};

const handleEditProject = (projectID, updatedName, newParentID) => {
  const updated = moveAndEditProject(navItems, projectID, { itemName: updatedName }, newParentID);
  setNavItems(updated);
};

const handleDeleteProject = (id) => {
  const updated = deleteProjectById(navItems, id);
  setNavItems(updated);
  if (selectedProjectID === id) {
    setSelectedProjectID(null);
  }
};

  return (
    <>
      <div className='flex justify-start items-start bg-gray-200'>
        <Sidebar
          isSideBarCollapsed={isSideBarCollapsed}
          setIsSideBarCollapsed={setIsSideBarCollapsed}
          navItems={navItems}
          setSelectedProjectID={setSelectedProjectID}
        />
        <div className='ml-[20%] w-full flex flex-col items-start'>
          <Header onAddProjectClick={() => setIsModalOpen(true)} />
          <Main
            navItems={navItems}
            selectedProjectID={selectedProjectID}
            onDeleteProject={handleDeleteProject}
            onEditProject={handleEditProject}
          />

        </div>
      </div>

      {isModalOpen && (
        <AddProjectModal
          navItems={navItems}
          setNavItems={setNavItems}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default App
