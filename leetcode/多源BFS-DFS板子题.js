/*
 * @lc app=leetcode.cn id=994 lang=javascript
 *
 * [994] 腐烂的橘子
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
 var orangesRotting = function(grid) {
    // 思路: 多源BFS,板子题
    // 关键代码: for ([curx, cury] of queue) { for ([x, y] of dir) {
    // 关键代码: if (queue.length > 0) { time++;
    // 关键代码: return total === count ? time : -1;


    const [m, n] = [grid.length, grid[0].length];
    const dir = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    let total = 0, count = 0, time = 0;
    let queue = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j]);
                total++;
                count++;
            } else if (grid[i][j] === 1) {
                total++;
            }
        }
    }
    while (queue.length) {
        const newQueue = [];
        for ([curx, cury] of queue) {
            for ([x, y] of dir) {
                const [row, col] = [curx + x, cury + y];
                if (row < m && row >= 0 && col < n && col >= 0 && grid[row][col] === 1) {
                    grid[row][col] = 2;
                    newQueue.push([row, col]);
                    count++;
                }
            }
        }
        queue = newQueue;
        if (queue.length > 0) {
            time++;
        }
    }
    return total === count ? time : -1;
};
// @lc code=end

/*
 * @lc app=leetcode.cn id=1765 lang=javascript
 *
 * [1765] 地图中的最高点
 */

// @lc code=start
/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
 var highestPeak = function(isWater) {
    // 多源BFS板子题，和994腐烂的橘子一样
    // 因为任意相邻的格子高度差至多为 1，同时如果一个格子是 水域 ，那么它的高度必须为 0 。
    // 基于以上两个条件，我们很容易想到从水域，即高度为 0 点出发，其相邻的陆地格子高度为 1。
    // 然后不断遍历完所有水域格子，遍历高度为1的陆地格子、高度为2的陆地格子....
    // 所以，使用BFS广度优先搜索，一开始入队的点是所有水域点，然后不断遍历陆地格子，直至遍历完所有格子。

    // 相邻格子
    const dir = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    // 扩散源头队列
    let queue = [];
    // isWater的尺寸
    const [m, n] = [isWater.length, isWater[0].length]
    // 初始化结果数组 目标是水域为 0； 陆地为 -1(表示未访问)
    const ans = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            isWater[i][j] === 1 && queue.push([i, j]); // 水先入队列
            ans[i][j] = isWater[i][j] === 1 ? 0 : -1;
        }
    }
    while (queue.length) {
        // shift会超时，所以用一个新队列
        const newQueue = [];
        // 遍历相邻格子
        for (const [curx, cury] of queue) {
            for (const [x, y] of dir) {
                // 下一个位置
                const [row, col] = [curx + x, cury + y];
                // 是否越界并且被遍历过
                if (
                    row >= 0 &&
                    col >= 0 &&
                    row < m &&
                    col < n &&
                    ans[row][col] === -1
                ) {
                    ans[row][col] = ans[curx][cury] + 1;
                    newQueue.push([row, col]);
                }
            }
        }
        queue = newQueue;
    }
    return ans;
};
// @lc code=end


/*
 * @lc app=leetcode.cn id=1034 lang=javascript
 *
 * [1034] 边框着色
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} col
 * @param {number} color
 * @return {number[][]}
 */
 var colorBorder = function(grid, row, col, color) {
    // BFS
    // 关键 set记录used.add([curx, cury].toString()
    
    const [m, n] = [grid.length, grid[0].length];
    const dir = [[0, 1], [0, -1], [-1, 0],[1, 0]];
    let queue = [[row, col]], pre = grid[row][col];
    const need = [], used = new Set();
    while(queue.length){
        const newQueue = []
        for(let i = 0, len = queue.length; i < len; i++){
            const [curx, cury] = queue.pop()
            if(!used.has([curx, cury].toString())){
                used.add([curx, cury].toString())
                let count = 0;
                for(let [x, y] of dir){
                    const [row, col] = [curx + x, cury + y];
                    if(row >= 0 && row < m && col >= 0 && col < n && grid[row][col] === pre){
                        count++;
                        newQueue.push([row, col]);
                    }
                }
                // 是边界
                if(count < 4){
                    need.push([curx, cury]);
                }
            }
        }
        queue = newQueue;
    }
    for(let [x,y] of need) {
        grid[x][y] = color;
    } 
    return grid;
};
// @lc code=end


/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
 var numIslands = function(grid) {
    // 思路: dfs水里滴墨，四处蔓延
    // 关键代码: if (x < 0 || x >= m || y < 0 || y >=n || grid[x][y] !== '1') { // 边界return
    // 关键代码: if (grid[x][y] === '1') {grid[x][y] = '0';} // 污染
    // if (grid[i][j] === '1') { // 遇到一个就污染 且 ans++
    //   dfs(grid, i, j);
    //   ans++;
    // }
    
    // dfs
    const [m, n] = [grid.length, grid[0].length];
    const dfs = (grid, x, y) => {
        if (x < 0 || x >= m || y < 0 || y >=n || grid[x][y] !== '1') {
            return;
        }
        grid[x][y] = '0';
        // 遍历四个方向
        dfs(grid, x - 1, y);
        dfs(grid, x + 1, y);
        dfs(grid, x, y - 1);
        dfs(grid, x, y + 1);
    }
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                dfs(grid, i, j);
                ans++;
            }
        }
    }
    // return ans;

    // bfs
    let count = 0, queue = [];
    const [m, n] = [grid.length, grid[0].length];
    const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    turnZero = (queue) => {
        while (queue.length) {//当队列中还有元素的时候 
            const newQueue = [];
            for ([curx, cury] of queue) {
                for (const [x, y] of dir) {//四个方向广度优先扩散
                    const [row, col] = [curx + x, cury + y]; 
                    if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] !== '1') {
                        continue
                    } //检查坐标合法性
                    grid[row][col] = '0'; //沉没陆地
                    newQueue.push([row, col]); //四周的节点加入队列
                }
            }
            queue = newQueue;
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                grid[i][j] = '0'; // 做标记，避免重复遍历
                queue.push([i, j]); //加入队列
                turnZero(queue);
            }
        }
    }
    return count;
};
// @lc code=end



/*
 * @lc app=leetcode.cn id=1020 lang=javascript
 *
 * [1020] 飞地的数量
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
 var numEnclaves = function(grid) {
    // 思路: dfs、最外圈开始向里面污染，剩下的都是飞地
    // 关键代码: 污染第一行和最后一行以及第一列和最后一列的代码
    
    const dir = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const [m, n] = [grid.length, grid[0].length];

    // 污染第一行和最后一行
    for (let i = 0; i < n; i++) {
        dirty(grid, 0, i);
        dirty(grid, m - 1, i);
    }

    // 污染第一列和最后一列
    for (let j = 0; j < m; j++) {
        dirty(grid, j, 0);
        dirty(grid, j, n - 1);
    }

    function dirty (grid, i, j) {
        if (i >= m || i < 0 || j >= n || j < 0 || grid[i][j] === 0) { // 出界或者遇到0
            return;
        }
        grid[i][j] = 0;
        for ([x, y] of dir) {
            const [curx, cury] = [x + i, y + j];
            dirty(grid, curx, cury); // 继续污染
        }
    }

    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                ans++;
            }
        }
    }

    return ans;
};
// @lc code=end

