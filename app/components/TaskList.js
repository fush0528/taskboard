'use client'

import Link from 'next/link'
// 【重要觀念 11：Props 解構】
// 使用解構賦值來獲取 props，這是一種更清晰的寫法
// tasks: 任務列表數組，包含每個任務的資訊
// onDelete: 刪除任務的回調函數，從父組件傳遞
export default function Tasklist({ tasks , onDelete}) {
    return (
        // 【重要觀念 12：列表渲染】
        <ul className="space-y-2">
            {/* 
                使用 map 方法渲染列表
                常見錯誤：
                1. 忘記提供 key prop
                2. 使用索引作為 key（在項目會重新排序的情況下不推薦）
                3. className 拼寫錯誤（注意是 className 而不是 classname）
            */}
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="border p-4 rounded flex justify-between items-center"
                >   

                    {/* 使用 Link 組件進行頁面導航，href 使用模板字符串動態生成 */}
                    <Link
                        href={`/task/${task.id}`}
                        className="text-blue-500 hover:underline"
                    >
                    {task.title}
                </Link>

                <button
                    className="text-red-500"
                    onClick={() => onDelete(task.id)} // 調用父組件傳遞的 onDelete 函數
                >
                    Delete

                </button>
                </li>
            ))}
        </ul>
    );
}