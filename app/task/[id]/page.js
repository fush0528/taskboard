'use client';

import { useRouter } from 'next/navigation';
import { use, useState } from 'react';

export default function TaskPage({ params }) {
    const router = useRouter();
    const { id }=params;
    const [title, setTitle] = useState(''); // 初始值為空字符串
    const [description, setDescription] = useState('');
    

    const handleUpdate = () => {
        const savedTask = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = savedTask.find((task) => 
            task.id === Number(id) ? {...task, title, description} : task
        );

        // 在這裡處理更新任務的邏輯
        localStorage.setItem('tasls', JSON.stringify())
        router.push('/'); // 更新後返回首頁
    };

    useEffect(() => {
        const savedTask = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = savedTask.find((t) => t.id === Number(id));
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [id]);


    return (
        <div>
            <h1>Update Task</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );



    return(
        <main className="p-4 max-w-xl mx-auto">
            <h1 className="text-2x1 font-bold">
                Task Details
            </h1>
        <input
            className="border p-2 w-full mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
        />
        <textarea
            className="border p-2 w-full mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={4}
        />

        <button
        className="bg-green-500 text-while px-4 py-2"
        onClick={handleSave}
        >    
            Save
        </button>

    

        </main>
    )
}
