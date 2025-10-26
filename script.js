// N&N Wedding Configuration
const WEDDING_DATE = new Date(2025, 2, 1); // 1 มีนาคม 2568
const AUTH_PASSWORD = "1212312121"; // รหัสผ่านใหม่

// Enhanced tasks structure with detailed subtasks
const defaultTasks = [
    {
        id: 1,
        name: "6 เดือนก่อนงาน",
        category: "6",
        description: "เตรียมการเบื้องต้นและจองสถานที่",
        completed: false,
        subtasks: [
            { id: 101, name: "กำหนดงบประมาณทั้งหมด", completed: false, description: "คำนวณงบประมาณ venue, อาหาร, ชุดแต่งงาน, ของที่ระลึก" },
            { id: 102, name: "จองสถานที่จัดงาน", completed: false, description: "สำรวจและจองสถานที่ พร้อมยืนยันจำนวนผู้เข้าร่วม" },
            { id: 103, name: "เลือกและจองชุดแต่งงาน", completed: false, description: "ชุดเจ้าสาวและเจ้าบ่าว พร้อมทดลองสวม" },
            { id: 104, name: "จองช่างภาพและวิดีโอ", completed: false, description: "สัมภาษณ์และเลือกทีมงานถ่ายภาพ" }
        ]
    },
    {
        id: 2,
        name: "3 เดือนก่อนงาน", 
        category: "3",
        description: "เตรียมการหลักและจอง Supplier",
        completed: false,
        subtasks: [
            { id: 201, name: "ออกแบบและสั่งการ์ดเชิญ", completed: false, description: "ออกแบบการ์ดเชิญและสั่งพิมพ์" },
            { id: 202, name: "เลือกและจองพวงมาลัย", completed: false, description: "ออกแบบพวงมาลัยและจองดอกไม้" },
            { id: 203, name: "วางแผนเมนูอาหาร", completed: false, description: "ทดลองชิมและยืนยันเมนูสุดท้าย" },
            { id: 204, name: "จองพาหนะรับส่ง", completed: false, description: "รถเจ้าบ่าวและรถรับส่งแขก" }
        ]
    },
    {
        id: 3,
        name: "1 เดือนก่อนงาน",
        category: "1", 
        description: "ยืนยันรายละเอียดกับ Supplier",
        completed: false,
        subtasks: [
            { id: 301, name: "ส่งการ์ดเชิญ", completed: false, description: "ส่งการ์ดเชิญและติดตามการตอบรับ" },
            { id: 302, name: "ยืนยันรายละเอียดกับช่างภาพ", completed: false, description: "ยืนยันเวลากับช่างภาพ" },
            { id: 303, name: "ยืนยันรายละเอียดกับช่างวิดีโอ", completed: false, description: "ยืนยันเวลากับช่างวิดีโอ" },
            { id: 304, name: "ยืนยันรายละเอียดกับสถานที่", completed: false, description: "ยืนยันเวลากับสถานที่จัดงาน" },
            { id: 305, name: "ยืนยันรายละเอียดกับพิธีกร", completed: false, description: "ยืนยันเวลากับพิธีกร" },
            { id: 306, name: "ยืนยันรายละเอียดกับผู้จัดอาหาร", completed: false, description: "ยืนยันเมนูและเวลาจัดอาหาร" },
            { id: 307, name: "เตรียมของที่ระลึก", completed: false, description: "จัดเตรียมและห่อของที่ระลึก" }
        ]
    },
    {
        id: 4,
        name: "1 สัปดาห์ก่อนงาน",
        category: "0.25",
        description: "เตรียมการสุดท้าย", 
        completed: false,
        subtasks: [
            { id: 401, name: "ยืนยันจำนวนแขกสุดท้าย", completed: false, description: "แจ้งจำนวนแขกจริงให้สถานที่และผู้จัดเลี้ยง" },
            { id: 402, name: "ตรวจสอบสภาพอากาศ", completed: false, description: "เตรียมแผนสำรองหากฝนตก" },
            { id: 403, name: "จ่ายมัดจำส่วนที่เหลือ", completed: false, description: "ชำระเงิน Supplier ต่างๆ" }
        ]
    },
    {
        id: 5,
        name: "วันงาน",
        category: "0",
        description: "วันสำคัญ",
        completed: false, 
        subtasks: [
            { id: 501, name: "เตรียมชุดแต่งงานและของใช้ส่วนตัว", completed: false, description: "ชุดแต่งงาน, แหวน, เอกสาร" },
            { id: 502, name: "พิธีแต่งงานและรับประทานอาหาร", completed: false, description: "ดำเนินงานตามกำหนดการ" },
            { id: 503, name: "ถ่ายภาพครอบครัว", completed: false, description: "ถ่ายภาพกับครอบครัวและเพื่อนๆ" }
        ]
    }
];

class NNWeddingChecklist {
    constructor() {
        this.tasks = this.loadTasks();
        this.nextId = this.getNextId();
        this.isAuthenticated = false;
        this.authModal = new bootstrap.Modal(document.getElementById('authModal'));
        this.categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
        this.addTaskModal = new bootstrap.Modal(document.getElementById('addTaskModal'));
        this.allTasksModal = new bootstrap.Modal(document.getElementById('allTasksModal'));
        this.currentCategory = null;
        
        this.initializeEventListeners();
        this.startCountdown();
        this.render();
        this.updateProgress();
        
        // Update countdown every second
        setInterval(() => this.startCountdown(), 1000);
    }

    getNextId() {
        let maxId = 0;
        this.tasks.forEach(category => {
            maxId = Math.max(maxId, category.id);
            category.subtasks.forEach(subtask => {
                maxId = Math.max(maxId, subtask.id);
            });
        });
        return maxId + 1;
    }

    initializeEventListeners() {
        // Auth
        document.getElementById('authForm').addEventListener('submit', (e) => this.handleAuth(e));
        
        // Add Task
        document.getElementById('addTaskBtn').addEventListener('click', () => this.showAddTaskModal());
        document.getElementById('addTaskForm').addEventListener('submit', (e) => this.handleAddTask(e));
        
        // View All
        document.getElementById('viewAllBtn').addEventListener('click', () => this.showAllTasks());
    }

    loadTasks() {
        try {
            const saved = localStorage.getItem('nnWeddingTasks');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
        return JSON.parse(JSON.stringify(defaultTasks)); // Deep copy
    }

    saveTasks() {
        try {
            localStorage.setItem('nnWeddingTasks', JSON.stringify(this.tasks));
            this.updateProgress();
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }

    startCountdown() {
        try {
            const now = new Date();
            const timeDiff = WEDDING_DATE.getTime() - now.getTime();
            
            if (timeDiff <= 0) {
                // Wedding day has arrived
                this.updateCountdownDisplay(0, 0, 0, 0, 0);
                return;
            }
            
            // Calculate time units
            const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44));
            const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            this.updateCountdownDisplay(months, days, hours, minutes, seconds);
        } catch (error) {
            console.error('Error in countdown:', error);
        }
    }

    updateCountdownDisplay(months, days, hours, minutes, seconds) {
        const elements = {
            months: document.getElementById('months'),
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        const values = {
            months: months,
            days: days,
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
        };

        Object.keys(elements).forEach(key => {
            if (elements[key] && elements[key].textContent !== values[key].toString()) {
                elements[key].classList.add('countdown-changing');
                setTimeout(() => {
                    elements[key].textContent = values[key];
                    elements[key].classList.remove('countdown-changing');
                }, 300);
            }
        });
    }

    updateProgress() {
        try {
            const allSubtasks = this.tasks.flatMap(task => task.subtasks);
            const totalTasks = allSubtasks.length;
            const completedTasks = allSubtasks.filter(t => t.completed).length;
            const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
            
            // Update progress circle
            const circle = document.querySelector('.progress-fill');
            const circumference = 226;
            const offset = circumference - (progressPercent / 100) * circumference;
            if (circle) {
                circle.style.strokeDashoffset = offset;
            }
            
            // Update numbers
            document.getElementById('progressPercent').textContent = progressPercent;
            document.getElementById('totalTasks').textContent = totalTasks;
            document.getElementById('completedTasks').textContent = completedTasks;
            document.getElementById('remainingTasks').textContent = totalTasks - completedTasks;
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    }

    showAddTaskModal() {
        if (!this.isAuthenticated) {
            this.authModal.show();
            return;
        }
        document.getElementById('addTaskForm').reset();
        this.addTaskModal.show();
    }

    handleAddTask(e) {
        e.preventDefault();
        
        const name = document.getElementById('newTaskName').value.trim();
        const category = document.getElementById('newTaskCategory').value;
        const description = document.getElementById('newTaskDescription').value.trim();

        if (!name || !category) {
            this.showMessage('กรุณากรอกชื่อรายการและเลือกหมวดหมู่', 'error');
            return;
        }

        const targetCategory = this.tasks.find(t => t.category === category);
        if (targetCategory) {
            const newSubtask = {
                id: this.nextId++,
                name: name,
                completed: false,
                description: description
            };
            
            targetCategory.subtasks.push(newSubtask);
            this.saveTasks();
            this.render();
            this.addTaskModal.hide();
            
            this.showMessage('เพิ่มรายการเรียบร้อยแล้ว!', 'success');
        }
    }

    handleAuth(e) {
        e.preventDefault();
        const password = document.getElementById('authPassword').value;
        
        if (password === AUTH_PASSWORD) {
            this.isAuthenticated = true;
            this.authModal.hide();
            document.getElementById('authPassword').value = '';
            this.showAddTaskModal();
        } else {
            this.showMessage('รหัสผ่านไม่ถูกต้อง', 'error');
        }
    }

    showMessage(message, type = 'success') {
        // Remove existing message
        const existingMessage = document.querySelector('.success-message, .error-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = type === 'success' ? 'success-message' : 'success-message';
        messageElement.style.background = type === 'success' ? 'var(--ios-green)' : 'var(--ios-red)';
        messageElement.textContent = message;
        document.body.appendChild(messageElement);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    showCategoryDetails(categoryId) {
        this.currentCategory = this.tasks.find(t => t.id === categoryId);
        if (this.currentCategory) {
            document.getElementById('categoryModalTitle').textContent = this.currentCategory.name;
            this.renderSubtasks();
            this.categoryModal.show();
        }
    }

    renderSubtasks() {
        const container = document.getElementById('subtaskList');
        if (!container) return;

        let html = '';
        
        this.currentCategory.subtasks.forEach(subtask => {
            html += `
                <div class="subtask-item">
                    <div class="subtask-info">
                        <div class="subtask-name">${subtask.name}</div>
                        <div class="subtask-description">${subtask.description}</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" ${subtask.completed ? 'checked' : ''} 
                               onchange="window.nnWedding.toggleSubTask(${this.currentCategory.id}, ${subtask.id})">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            `;
        });
        
        container.innerHTML = html || '<p class="text-muted text-center">ไม่มีรายการย่อย</p>';
    }

    toggleSubTask(categoryId, subtaskId) {
        const category = this.tasks.find(t => t.id === categoryId);
        if (category) {
            const subtask = category.subtasks.find(st => st.id === subtaskId);
            if (subtask) {
                subtask.completed = !subtask.completed;
                
                // Update category completion status
                const allCompleted = category.subtasks.every(st => st.completed);
                category.completed = allCompleted;
                
                this.saveTasks();
                this.render();
                
                // Update the specific subtask in modal if open
                if (this.currentCategory && this.currentCategory.id === categoryId) {
                    this.renderSubtasks();
                }
                
                this.showMessage(subtask.completed ? 'ทำเครื่องหมายเสร็จสมบูรณ์!' : 'ยกเลิกสถานะเสร็จสมบูรณ์');
            }
        }
    }

    showAllTasks() {
        this.renderAllTasks();
        this.allTasksModal.show();
    }

    renderAllTasks() {
        const container = document.getElementById('allTasksList');
        if (!container) return;

        let html = '';
        
        this.tasks.forEach(category => {
            html += `
                <div class="category-header" style="margin-top: 1rem; margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--ios-gray-5);">
                    <h6 style="margin: 0; color: var(--ios-blue); font-weight: 600;">${category.name}</h6>
                    <small style="color: var(--ios-gray-2);">${category.description}</small>
                </div>
            `;
            
            category.subtasks.forEach(subtask => {
                html += `
                    <div class="subtask-item">
                        <div class="subtask-info">
                            <div class="subtask-name">${subtask.name}</div>
                            <div class="subtask-description">${subtask.description}</div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" ${subtask.completed ? 'checked' : ''} 
                                   onchange="window.nnWedding.toggleSubTask(${category.id}, ${subtask.id})">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                `;
            });
        });
        
        container.innerHTML = html || '<p class="text-muted text-center">ไม่มีรายการ</p>';
    }

    calculateCategoryProgress(category) {
        const total = category.subtasks.length;
        const completed = category.subtasks.filter(st => st.completed).length;
        return total > 0 ? (completed / total) * 100 : 0;
    }

    calculateCategoryStatus(category) {
        const now = new Date();
        const dueDate = new Date(WEDDING_DATE);
        
        // Calculate due date based on category
        const monthsBefore = parseFloat(category.category);
        dueDate.setMonth(dueDate.getMonth() - monthsBefore);
        
        const timeDiff = dueDate.getTime() - now.getTime();
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        
        if (daysDiff > 30) return 'ontime';
        if (daysDiff > 0) return 'almost';
        return 'late';
    }

    render() {
        const container = document.getElementById('categoriesContainer');
        if (!container) return;

        let html = '';

        this.tasks.forEach(category => {
            const progress = this.calculateCategoryProgress(category);
            const completedCount = category.subtasks.filter(st => st.completed).length;
            const totalCount = category.subtasks.length;
            const status = this.calculateCategoryStatus(category);
            
            html += `
                <div class="category-card" onclick="window.nnWedding.showCategoryDetails(${category.id})">
                    <div class="category-header">
                        <h3 class="category-title">${category.name}</h3>
                        <div class="category-progress">
                            <span class="progress-text-small">${Math.round(progress)}%</span>
                            <div class="progress-bar-container">
                                <div class="progress-bar" style="width: ${progress}%"></div>
                            </div>
                        </div>
                    </div>
                    <p class="category-description">${category.description}</p>
                    <div class="category-footer">
                        <div class="subtask-count">
                            ${completedCount} / ${totalCount} รายการเสร็จสมบูรณ์
                        </div>
                        <span class="category-status ${status}">
                            ${status === 'ontime' ? 'ตามเวลา' : status === 'almost' ? 'ใกล้ถึงกำหนด' : 'เลยกำหนด'}
                        </span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html || '<p class="text-muted text-center">ไม่มีหมวดหมู่</p>';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.nnWedding = new NNWeddingChecklist();
});
