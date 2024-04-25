import React from "react";
import Link from "next/link";
/* ------------------------------------------------------------------------------------------------------------------
      
                                                 {
                                              _id: new ObjectId('65f87be8b4ac8ce41b942034'),
                                              taskName: 'New Task',
                                              type: 'Designer Tasks',
                                              description: 'Task for testing ',
                                              status: 'Not Assigned',
                                              createdBy: {
                                                _id: new ObjectId('65f6a968c4a39d7a8196a9b7'),
                                                name: 'John Doe'
                                              },
                                              completedInTime: false,
                                              project: new ObjectId('65f71d6fa3dadd2dc61f47f0'),
                                              createdAt: 2024-03-18T17:37:44.265Z,
                                              updatedAt: 2024-03-18T17:37:44.265Z,
                                              __v: 0
                                            }
      
     ------------------------------------------------------------------------------------------------------------------ */

// Funnction for Row rendering

const TaskRow = ({ data, projectId }) => {
  return (
    <div className="container mx-auto h-96 max-h-96 overflow-y-scroll no-scrollbar bg-gray-200 rounded-md shadow-md">
      <table className="w-full border border-gray-300 relative">
        <thead>
          <tr className="bg-white sticky top-0">
            <th className="border px-4 py-2">No.</th>
            <th className="border px-4 py-2">Task Name</th>
            <th className="border px-4 py-2">Task for</th>
            {/* <th className="border px-4 py-2">Description</th> */}
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Created By</th>
            <th className="border px-4 py-2">Assigned To</th>
            <th className="border px-4 py-2">Completed</th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll h-80">
          {data &&
            data.map((task, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100 max-h-5" : "bg-white max-h-5"}
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <Link
                    href={`/dashboard/projects/${projectId}/tasks/${task._id}`}
                  >
                    {task.taskName}
                  </Link>
                </td>
                <td className="border px-4 py-2">{task.type}</td>
                {/* <td className="border px-4 py-2">{task.description}</td> */}
                <td className="border px-4 py-2">{task.status}</td>
                <td className="border px-4 py-2">{task.createdBy.name}</td>
                <td className="border px-4 py-2">
                  {task?.assignedTo ? task.assignedTo.name : "Null"}
                </td>
                <td className="border px-4 py-2">
                  {task.completedInTime ? "Yes" : "No"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskRow;
