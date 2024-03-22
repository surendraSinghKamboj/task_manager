import { getTask } from "@/actions/task";
import React from "react";

// -----------------------------------------------------------------------------------------------------
/**
 * 
 * 
                                       {
                                         status: true,
                                        task: {
                                          _id: new ObjectId('65fba136be538c9db6fc5680'),
                                          taskName: 'Landing page',
                                          type: 'Developer Tasks',
                                          description: 'Default',
                                          status: 'Not Assigned',
                                          createdBy: new ObjectId('65f6a968c4a39d7a8196a9b7'),
                                          completedInTime: false,
                                          project: new ObjectId('65f71d6fa3dadd2dc61f47f0'),
                                          createdAt: 2024-03-18T17:18:52.648Z,
                                          updatedAt: 2024-03-18T17:18:52.648Z,
                                          __v: 0
                                        }
                                      }
 * 
 */
// -----------------------------------------------------------------------------------------------------

const TaskById = async ({ params }) => {
  const task = await getTask(params.taskID, params.projectId);
  console.log(task);
  return (
    <div>
      {params.taskID}
      <p>{JSON.stringify(task)}</p>
    </div>
  );
};

export default TaskById;
