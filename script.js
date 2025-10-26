// N&N Wedding Configuration
const WEDDING_DATE = new Date(2025, 2, 1); // 1 มีนาคม 2568
const AUTH_PASSWORD = "1212312121"; // รหัสผ่านใหม่

// Tasks data แบบเรียบง่าย (ไม่มี subtasks)
const defaultTasks = [
    // 6 months before (กันยายน 2567)
    { 
        id: 1, 
        name: "กำหนดงบประมาณทั้งหมด", 
        category: "6", 
        description: "คำนวณงบประมาณ venue, อาหาร, ชุดแต่งงาน, ของที่ระลึก", 
        completed: false 
    },
    { 
        id: 2, 
        name: "จองสถานที่จัดงาน", 
        category: "6", 
        description: "สำรวจและจองสถานที่ พร้อมยืนยันจำนวนผู้เข้าร่วม", 
        completed: false 
    },
    { 
        id: 3, 
        name: "เลือกและจองชุดแต่งงาน", 
        category: "6", 
        description: "ชุดเจ้าสาวและเจ้าบ่าว พร้อมทดลองสวม", 
        completed: false 
    },
    { 
        id: 4, 
        name: "จองช่างภาพและวิดีโอ", 
        category: "6", 
        description: "สัมภาษณ์และเลือกทีมงานถ่ายภาพ", 
        completed: false 
    },
    
    // 3 months before (ธันวาคม 2567)
    { 
        id: 5, 
        name: "ออกแบบและสั่งการ์ดเชิญ", 
        category: "3", 
        description: "ออกแบบการ์ดเชิญและสั่งพิมพ์", 
        completed: false 
    },
    { 
        id: 6, 
        name: "เลือกและจองพวงมาลัย", 
        category: "3", 
        description: "ออกแบบพวงมาลัยและจองดอกไม้", 
        completed: false 
    },
    { 
        id: 7, 
        name: "วางแผนเมนูอาหาร", 
        category: "3", 
        description: "ทดลองชิมและยืนยันเมนูสุดท้าย", 
        completed: false 
    },
    { 
        id: 8, 
        name: "จองพาหนะรับส่ง", 
        category: "3", 
        description: "รถเจ้าบ่าวและรถรับส่งแขก", 
        completed: false 
    },
    
    // 1 month before (กุมภาพันธ์ 2568)
    { 
        id: 9, 
        name: "ส่งการ์ดเชิญ", 
        category: "1", 
        description: "ส่งการ์ดเชิญและติดตามการตอบรับ", 
        completed: false 
    },
    { 
        id: 10, 
        name: "ยืนยันรายละเอียดกับ Supplier", 
        category: "1", 
        description: "ยืนยันเวลากับช่างภาพ, คนถ่ายวิดีโอ, สถานที่", 
        completed: false 
    },
    { 
        id: 11, 
        name: "เตรียมของที่ระลึก", 
        category: "1", 
        description: "จัดเตรียมและห่อของที่ระลึก", 
        completed: false 
    },
    
    // 1 week before (กุมภาพันธ์ 2568)
    { 
        id: 12, 
        name: "ยืนยันจำนวนแขกสุดท้าย", 
        category: "0.25", 
        description: "แจ้งจำนวนแขกจริงให้สถานที่และผู้จัดเลี้ยง", 
        completed: false 
    },
    { 
        id: 13, 
        name: "ตรวจสอบสภาพอากาศ", 
        category: "0.25", 
        description: "เตรียมแผนสำรองหากฝนตก", 
        completed: false 
    },
    { 
        id: 14, 
        name: "จ่ายมัดจำส่วนที่เหลือ", 
        category: "0.25", 
        description: "ชำระเงิน Supplier ต่างๆ", 
        completed: false 
    },
    
    // Wedding day (มีนาคม 2568)
    { 
        id: 15, 
        name: "เตรียมชุดแต่งงานและของใช้ส่วนตัว", 
        category: "0", 
        description: "ชุดแต่งงาน, แหวน, เอกสาร", 
        completed: false 
    },
    { 
        id: 16, 
        name: "พิธีแต่งงานและรับประทานอาหาร", 
        category: "0", 
        description: "ดำเนินงานตามกำหนดการ", 
        completed: false 
    },
    { 
        id: 17, 
        name: "ถ่ายภาพครอบครัว", 
        category: "0", 
        description: "ถ่ายภาพกับครอบครัวและเพื่อนๆ", 
        completed: false 
    }
];

class NNWeddingChecklist {
    constructor() {
        this.tasks = this.loadTasks();
        this.nextId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 18;
        this.isAuthenticated = false;
        this.authModal = new bootstrap.Modal(document.getElementById('authModal'));
        
        this.initializeEventListeners();
        this.startCountdown();
        this.render();
        this.updateProgress();
        
        // Update countdown every second
        setInterval(() => this.startCountdown(), 1000);
    }

    initializeEventListeners() {
        // Auth
        document.getElementById('authForm').addEventListener('submit', (e) => this.handleAuth(e));
        
        // Tasks
        document.getElementById('addTaskBtn').addEventListener('click', () => this.showAddForm());
    }

    loadTasks() {
        const saved = localStorage.getItem('nnWeddingTasks');
        return saved ? JSON.parse(saved) : defaultTasks;
    }

    saveTasks() {
        localStorage.setItem('nnWeddingTasks', JSON.stringify(this.tasks));
        this.updateProgress();
    }

    startCountdown() {
        const now = new Date();
        const timeDiff = WEDDING_DATE.getTime() - now.getTime();
        
        // Calculate time units
        const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        // Update display
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateProgress() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.completed).length;
        const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        // Update progress circle
        const circle = document.querySelector('.progress-fill');
        const circumference = 226; // 2 * π * 36
        const offset = circumference - (progressPercent / 100) * circumference;
        if (circle) {
            circle.style.strokeDashoffset = offset;
        }
        
        // Update numbers
        document.getElementById('progressPercent').textContent = progressPercent;
        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('remainingTasks').textContent = totalTasks - completedTasks;
    }

    showAddForm() {
        if (!this.isAuthenticated) {
            this.authModal.show();
            return;
        }
        // ฟังก์ชันเพิ่มรายการ - ยังไม่ได้ implement
        alert('ฟังก์ชันเพิ่มรายการ - ต้องล็อกอินก่อน');
    }

    handleAuth(e) {
        e.preventDefault();
        const password = document.getElementById('authPassword').value;
        
        if (password === AUTH_PASSWORD) {
            this.isAuthenticated = true;
            this.authModal.hide();
            document.getElementById('authPassword').value = '';
            alert('ล็อกอินสำเร็จ! ตอนนี้สามารถเพิ่ม/แก้ไขรายการได้');
        } else {
            alert('รหัสผ่านไม่ถูกต้อง');
        }
    }

    requireAuth(action) {
        if (!this.isAuthenticated) {
            this.authModal.show();
            return false;
        }
        return true;
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
            
            // Add pulse animation
            const taskElement = document.querySelector(`[data-task-id="${id}"]`);
            if (taskElement) {
                taskElement.classList.add('completed-pulse');
                setTimeout(() => {
                    taskElement.classList.remove('completed-pulse');
                }, 500);
            }
        }
    }

    deleteTask(id) {
        if (!this.requireAuth()) return;
        
        if (confirm('คุณต้องการลบรายการนี้ใช่หรือไม่?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.render();
        }
    }

    editTask(id) {
        if (!this.requireAuth()) return;
        
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            const newName = prompt('แก้ไขชื่อรายการ:', task.name);
            if (newName !== null && newName.trim() !== '') {
                task.name = newName;
                this.saveTasks();
                this.render();
            }
        }
    }

    calculateStatus(task) {
        const now = new Date();
        const dueDate = new Date(WEDDING_DATE);
        
        // Calculate due date based on category
        const monthsBefore = parseFloat(task.category);
        dueDate.setMonth(dueDate.getMonth() - monthsBefore);
        
        const timeDiff = dueDate.getTime() - now.getTime();
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        
        if (daysDiff > 30) return 'ontime';
        if (daysDiff > 0) return 'almost';
        return 'late';
    }

    showAllTasks() {
        this.render();
    }

    render() {
        const container = document.getElementById('tasksContainer');
        const categories = [
            { id: '6', title: '6 เดือนก่อนงาน (กันยายน 2567)' },
            { id: '3', title: '3 เดือนก่อนงาน (ธันวาคม 2567)' },
            { id: '1', title: '1 เดือนก่อนงาน (กุมภาพันธ์ 2568)' },
            { id: '0.25', title: '1 สัปดาห์ก่อนงาน (กุมภาพันธ์ 2568)' },
            { id: '0', title: 'วันงาน (1 มีนาคม 2568)' }
        ];

        let html = '';

        categories.forEach(cat => {
            const categoryTasks = this.tasks.filter(task => task.category === cat.id);
            
            if (categoryTasks.length > 0) {
                html += `
                    <div class="category-section">
                        <div class="category-header">${cat.title}</div>
                `;

                categoryTasks.forEach(task => {
                    const status = this.calculateStatus(task);
                    const statusClass = status;
                    const statusText = status === 'ontime' ? 'ตามเวลา' : status === 'almost' ? 'ใกล้ถึงกำหนด' : 'เลยกำหนด';
                    
                    html += `
                        <div class="task-item ${statusClass} ${task.completed ? 'completed' : ''}" 
                             data-task-id="${task.id}">
                            <div class="task-header">
                                <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                                     onclick="nnWedding.toggleTask(${task.id})">
                                    ${task.completed ? '✓' : ''}
                                </div>
                                <div class="task-content">
                                    <div class="task-title">${task.name}</div>
                                    ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                                </div>
                            </div>
                            <div class="task-footer">
                                <span class="task-status ${statusClass}">${statusText}</span>
                                <div class="task-actions">
                                    <button class="btn btn-sm btn-outline-primary me-1" 
                                            onclick="event.stopPropagation(); nnWedding.editTask(${task.id})">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" 
                                            onclick="event.stopPropagation(); nnWedding.deleteTask(${task.id})">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });

                html += `</div>`;
            }
        });

        container.innerHTML = html;
    }
}

// Initialize the application
const nnWedding = new NNWeddingChecklist();
