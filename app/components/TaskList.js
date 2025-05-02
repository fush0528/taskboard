// 【重要觀念 11：Props 解構】
// 使用解構賦值來獲取 props，這是一種更清晰的寫法
export default function Tasklist({ tasks }) {
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
            {tasks.map((task, index) => (
                <li
                    key={index}
                    className="border p-2 rounded"
                >
                    {task}
                </li>
            ))}
        </ul>
    );
}