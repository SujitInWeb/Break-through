# 🧱 Break-through !

<div align="center">
  <img src="https://img.shields.io/badge/Game-BreakThrough-brightgreen" alt="Breakout Game">
  <img src="https://img.shields.io/badge/Language-JavaScript-yellow" alt="JavaScript">
  <img src="https://img.shields.io/badge/Canvas-HTML5-orange" alt="HTML5 Canvas">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="MIT License">
</div>

<div align="center">
  <h3>🎮 A classic Breakout game built with HTML5 Canvas, CSS, and JavaScript</h3>
  <p>Control the paddle to bounce the ball and destroy all bricks!</p>
</div>

---

## 📖 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [✨ Features](#-features)
- [🎯 How to Play](#-how-to-play)
- [🎮 Controls](#-controls)
- [🏆 Game Rules](#-game-rules)
- [📁 Project Structure](#-project-structure)
- [🛠️ Technical Details](#️-technical-details)
- [🎨 Styling](#-styling)
- [🔧 Customization](#-customization)
- [🐛 Known Issues](#-known-issues)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/breakout-game.git
   ```

2. **Navigate to project directory:**
   ```bash
   cd breakout-game
   ```

3. **Launch the game:**
   ```bash
   open index.html
   ```
   *Or simply double-click the `index.html` file*

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎮 **Smooth Gameplay** | 60fps gameplay with requestAnimationFrame |
| 📊 **Score Tracking** | Real-time score display and updates |
| 📱 **Responsive Design** | Fully responsive canvas that adapts to screen size |
| ⏸️ **Pause Function** | Space bar to pause/resume game |
| 🔄 **Auto Reset** | Game resets when ball is lost |
| 💥 **Physics Engine** | Realistic ball bounce with angle-based paddle hits |
| 🎯 **Dynamic Brick Layout** | Responsive 8x5 brick grid |
| 🎨 **Collision Detection** | Precise collision detection for ball, paddle, and bricks |

---

## 🎯 How to Play

### Basic Gameplay
1. **Move the paddle** using arrow keys or WASD
2. **Bounce the ball** off the paddle to hit bricks
3. **Destroy all bricks** to advance to the next level
4. **Don't let the ball fall** below the paddle
5. **Press Space** to pause/resume the game

### Objective
- Destroy all bricks to complete the level
- Each brick destroyed adds +1 to your score
- New level starts automatically when all bricks are destroyed

---

## 🎮 Controls

<div align="center">

| Key | Action | Description |
|-----|--------|-------------|
| ⬅️ **Left Arrow / A** | Move Left | Move paddle left |
| ➡️ **Right Arrow / D** | Move Right | Move paddle right |
| ⏸️ **Space Bar** | Pause/Resume | Toggle game state |

</div>

---

## 🏆 Game Rules

### 🎯 Objective
Destroy all bricks by bouncing the ball off your paddle

### 📈 Scoring System
- **+1 point** per brick destroyed
- Score displayed in real-time on the game canvas

### 💀 Game Over Conditions
- ❌ Ball falls below the paddle (auto-resets)

### 🏓 Ball Physics
- Ball bounces off walls, paddle, and bricks
- Paddle hit angle affects ball direction
- Speed remains constant throughout the game

### 🧱 Brick Behavior
- 8 rows × 5 columns = 40 bricks per level
- All bricks destroyed = new level starts
- Bricks are light green with visible borders

---

## 📁 Project Structure

```
breakout-game/
├── 📄 index.html          # Main HTML structure
├── 📜 index.js            # Game logic and functionality
├── 🎨 style.css           # Styling and layout
└── 📋 README.md           # This file
```

---

## 🛠️ Technical Details

### ⚙️ Game Configuration
| Setting | Value | Description |
|---------|-------|-------------|
| **Canvas Size** | 60% × 80% | Relative to viewport |
| **Brick Grid** | 8×5 | Rows × Columns |
| **Ball Size** | 1.5% of screen | Responsive sizing |
| **Paddle Size** | 15% × 2% | Width × Height of screen |
| **Game Speed** | 60fps | Using requestAnimationFrame |

### 🔄 Core Game Loop (`update()`)
1. **Check Game State** → Verify if game is running
2. **Move Paddle** → Update paddle position
3. **Move Ball** → Update ball position and handle collisions
4. **Draw Frame** → Render all game elements
5. **Recursive Call** → Continue the loop

### 🏓 Ball Movement System
- **Velocity Control**: `dx` and `dy` for directional movement
- **Wall Bouncing**: Reverses direction on collision
- **Paddle Physics**: Angle-based bouncing with hit position calculation
- **Brick Collision**: Ball reverses Y direction when hitting bricks

### 🧱 Brick Layout Algorithm
- **Responsive Positioning**: Calculates based on screen size
- **Dynamic Margins**: 10% top, 5% sides, 40% bottom
- **Automatic Spacing**: Calculates padding between bricks
- **Grid Generation**: Creates 8×5 brick array with collision detection

### 🎨 Responsive Canvas System
- **Auto-resize**: Canvas adjusts to container size
- **Element Scaling**: All game elements scale proportionally
- **Layout Recalculation**: Bricks and elements repositioned on resize

---

## 🎨 Styling

### 🎨 Color Scheme
| Element | Color Code | Description |
|---------|------------|-------------|
| **Background** | `#010409` | Main container background |
| **Game Area** | `#151B23` | Canvas background |
| **Ball** | `red` | Ball color with red stroke |
| **Paddle** | `lightgreen` | Paddle color |
| **Bricks** | `lightgreen` | Brick fill and stroke |
| **Score Text** | `white` | Primary score text |
| **Info Text** | `#888` | Secondary information text |
| **Borders** | `#3D444D` | Container border |

### 🔤 Typography
- **Main Font**: Poppins (modern, clean)
- **Score Display**: Arial (readable, consistent)
- **Responsive Sizing**: Font size scales with screen size

---

## 🔧 Customization

### 🎨 Colors
```javascript
// Modify these in the draw functions within index.js
// Ball color
ctx.fillStyle = 'red';        // Ball fill
ctx.strokeStyle = 'red';      // Ball stroke

// Paddle color
ctx.fillStyle = 'lightgreen'; // Paddle fill

// Brick color
brick.color = 'lightgreen';   // Individual brick colors
```

### ⚙️ Game Settings
```javascript
// Adjust game parameters in index.js
const brickRowCount = 8;      // Number of brick rows
const brickColumnCount = 5;   // Number of brick columns

// Ball settings (in resetGameElement function)
ball.size = Math.min(groundWidth, groundHeight) * 0.015;  // Ball size
ball.speed = Math.min(groundWidth, groundHeight) * 0.008; // Ball speed

// Paddle settings
paddle.w = groundWidth * 0.15;    // Paddle width
paddle.h = groundHeight * 0.02;   // Paddle height
paddle.speed = groundWidth * 0.012; // Paddle speed
```

### 🎭 Layout Customization
```javascript
// Modify brick layout in calculateBrickLayout function
const topMargin = groundHeight * 0.1;     // Top spacing
const sideMargin = groundWidth * 0.05;    // Side spacing
const bottomMargin = groundHeight * 0.4;  // Bottom spacing
```

### 📱 Canvas Size
```css
/* Modify container size in style.css */
.ground-container {
    width: 60%;          /* Container width */
    max-width: 800px;    /* Maximum width */
    height: 80%;         /* Container height */
}
```

---

## 🐛 Known Issues

- ⚠️ **Mobile Support**: No touch controls for mobile devices
- ⚠️ **Ball Physics**: Rare cases where ball might get stuck in corners
- ⚠️ **Resize Handling**: Game resets when window is resized

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### 💡 Ideas for Contribution
- Add mobile touch controls
- Implement power-ups (multi-ball, bigger paddle, etc.)
- Add high score persistence with localStorage
- Create different difficulty levels
- Add sound effects and background music
- Implement different brick types with varying hit points
- Add particle effects for brick destruction
- Create level progression with different layouts

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What does MIT License mean?
- ✅ **Commercial use allowed**
- ✅ **Modification allowed**
- ✅ **Distribution allowed**
- ✅ **Private use allowed**
- ⚠️ **Must include license and copyright**
- ❌ **No warranty provided**

---

<div align="center">
  <h3>🎮 Ready to Break Some Bricks?</h3>
  <p>Download the game and start playing now!</p>
  <p><strong>Happy Gaming! 🧱</strong></p>
</div>