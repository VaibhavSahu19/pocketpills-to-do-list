import React, { createContext, useEffect, useState } from 'react';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    // Initialize with local storage tasks or empty array
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : []; 
    });

    // Load tasks from local storage when the component mounts
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    // Update local storage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        const date = new Date();
        let day = date.getDate();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;

        const newTask = {
            id: task.id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            createdDate: currentDate,
            updatedDate: currentDate
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const deleteTask = (taskToDelete) => {
        const updatedTasks = tasks.filter(givenTask => {
            return givenTask.id !== taskToDelete.id;
        });
        setTasks(updatedTasks);
    };

     // Clear local storage
    const deleteAllTasks = () => {
        setTasks([]);
        localStorage.removeItem('tasks');
    };

    return (
        <TasksContext.Provider
            value={{
                tasks,
                setTasks,
                addTask,
                deleteTask,
                deleteAllTasks
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};
