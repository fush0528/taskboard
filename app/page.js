// 【重要觀念 1：Client Components】
// 'use client' 指令聲明這是一個客戶端組件，這意味著此組件的程式碼會在瀏覽器中執行
// 這是必需的，因為我們使用了 useState 這樣的客戶端功能
'use client';

// 【重要觀念 2：必要的導入】
// next/image：Next.js 優化的圖片組件，提供自動圖片優化
// useState：React 的狀態管理鉤子，用於管理組件內的狀態
import Link from "next/link";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Tasklist from "./components/TaskList";

// 【重要觀念 3：函數組件】
// 使用函數組件是 React 推薦的寫法
// 組件名稱必須以大寫字母開頭，這是 React 的命名規範
export default function Home() {
  // 【重要觀念 4：狀態管理】
  // useState 回傳一個包含兩個元素的數組：
  // 1. 當前狀態值
  // 2. 更新狀態的函數
  // 常見錯誤：直接修改 tasks，而不是使用 setTasks
  const [tasks, setTasks] = useState([]); // 初始值為空數組
  const [newTask, setNewTask] = useState('');

  const [nextId, setnextiId] = useState(1);

// 【重要觀念 4.1：useEffect 與本地存儲】
// 使用 useEffect 在組件加載時從 localStorage 讀取保存的任務
// 同時計算已存在任務的最大 ID，確保新任務的 ID 不會重複
useEffect(() => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  setTasks(savedTasks);
  const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id), 0);
  setnextiId(maxId + 1);
}, []); // 空依賴數組表示僅在組件首次渲染時執行一次


  // 【重要觀念 5：事件處理函數】
  const addTask = () => {
    // 【除錯技巧】：使用 console.log 來追蹤狀態變化
    console.log("Before:", tasks);

    // 【重要觀念 6：狀態不可變性】
    // 常見錯誤：直接修改原數組 tasks.push(newTask)
    // 正確做法：創建新數組
    const newTaskObj = {
      id: nextId,
      title: newTask,
      description: '',
    };
    
    
    const updatedTasks = [...tasks, newTaskObj];


    setTasks(updatedTasks);
    console.log("After", updatedTasks);

    // 重置輸入框
    setNewTask('');

    setnextiId(nextId +1);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }


  // 【重要觀念 6.1：任務刪除邏輯】
  // 使用 filter 方法創建新的任務數組，排除要刪除的任務
  // 更新狀態並同步到 localStorage
  const handleDelete = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }












  // 【重要觀念 7：JSX 渲染】
  return (
    // 【重要觀念 8：CSS 類名】
    // 在 JSX 中使用 className 而不是 HTML 的 class
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2x1 font-bold">Task Board</h1>

      {/* 【重要觀念 9：表單控制】 */}
      <div className="flex gap-2 mb-4">
        {/* 
          控制組件（Controlled Component）模式：
          1. value 屬性綁定到狀態
          2. onChange 處理器更新狀態
          常見錯誤：忘記提供 onChange 處理器，導致輸入框無法輸入
        */}
        <input
          className="border p-2 flex-1"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        {/* 
          【修正錯誤】：原程式碼中 'buttom' 拼寫錯誤，應為 'button'
          【修正錯誤】：'text-while' 拼寫錯誤，應為 'text-white'
        */}
        <button
          className="bg-blue-500 text-white px-4"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* 【重要觀念 10：組件組合】 */}
      {/* 將 tasks 作為 props 傳遞給子組件 */}
      <Tasklist tasks={tasks} onDelete={handleDelete}/>
     
    </main>
  );
}
