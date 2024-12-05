---
highlight: an-old-hope
theme: channing-cyan
---

# 前端有必要刷算法吗？ 

## 前言

*   先抛结论：刷了一段时间算法后，腰不酸了、腿不疼了、面试也不慌了，连看源码也更省力了，这难道就是内功提升带来的好处？（Vue3.0的diff算法优化（最长递增子序列）[源码在底部点这里](#ym)）

    在前端面试的征程中，曾遭遇了令人尴尬的时刻 —— 面对看似简单的题目（三数之和），思绪却如一团乱麻，磕磕绊绊。那一刻，挫败感如影随形，让我深刻认识到自己的不足。于是，我毅然踏上了刷题之路，Leetcode 成为了我的战场。每日沉浸其中，与各种算法和数据结构难题展开较量。从最初的磕磕绊绊，到逐渐掌握解题技巧，每一次的挑战都是一次成长。<br>
    为了提升临场发挥能力，我积极参加周赛。在紧张的时间限制下，激发自己的潜能，锻炼快速思考和解题的能力。随着时间的推移，努力终于有了回报。我的思维变得更加敏捷，解题能力显著提升。面对复杂的问题，能够冷静分析，迅速找到解决方案。曾经的难题不再是无法跨越的障碍，而是我成长的阶梯。这段经历让我明白，只要有决心和毅力，不断挑战自我，就能够突破困境，实现自我提升。无论是在前端面试中，还是在未来的职业生涯中，这段刷题的历程都将成为我宝贵的财富。<br>
![22743B59-2D2D-4EB3-A46A-BF13424E3CF0.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b29f9640acd349f4b77d0d44a2692ba4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5omT5pu05Lq6ZXI=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDA3MjI0Njc5ODQ2MDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725360540&x-orig-sign=TEAbkO9qwWz18yJvDxEDFyTfjGc%3D)

    有些公司会采取更为严格的考核方式，拿出纸笔，要求在没有任何提示的情况下当场书写算法代码。然而，这也丝毫难不倒我。长期的积累和磨练，让我的算法能力深入骨髓。我能从容地拿起笔，在纸上流畅地书写出清晰的思路和准确的代码，如同一位经验丰富的工匠，熟练地雕琢着自己的作品。<br>
    这种自信和从容，源于无数个日夜的努力与坚持。每一次在 Leetcode 上的奋战，每一次在周赛中的拼搏，都为我铸就了坚实的算法基石。如今，我可以自豪地面对各种算法挑战，在前端面试的舞台上展现出自己的实力与风采。话不多说，上题！

## 附上20题面试高频算法题

### 1、反转链表

leetcode地址:[反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

*   题解：

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    // 递归解法
    if (!head?.next) { // 终止条件
        return head;
    }
    const cur = reverseList(head.next); // 一直递
    head.next.next = head; // 回指 4.nex.next = head  就是  5.next = 4
    head.next = null; // 断开指防止循环
    return cur; // 一直返回尾巴,是因为每一层都要返回 尾巴5,也就是翻转后的head（需要的结果）

    // 双指针解法
    let pre = null, // 前一个节点为Null，必须
        cur = head, // 当前节点
        next = null; // 下一个节点
    while (cur) {
        next = cur.next; // 暂存下一个节点
        cur.next = pre; // 当前节点的next指向上一个节点，在此反转
        pre = cur; // 更新上一个节点到当前节点
        cur = next; // 当前节点往后走直到为null终止循环
    }
    return pre;
};
```

### 2、快排、冒泡、归并

leetcode地址：[排序](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)
*   题解：

```js
// 快排 partition pivot
const swap = (nums, a, b) => {
    [nums[a], nums[b]] = [nums[b], nums[a]];
}

// 主函数,为了让调用的时候只需要传arr, left和right的值默认赋值
const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return; // 递归出口
    const pivotIndex = partition(arr, left, right)
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
}

// 分区操作，小的在左边大的在右边,最后返回中点pivotIndex
const partition = (arr, left, right) => {
    let j = left, pivot = right;
    const randomIndex = left + ((Math.random() * (right - left + 1)) | 0); // 为了交换最后一个数
    swap(arr, randomIndex, right); // 为了交换最后一个数
    for (let i = left; i <= right; i++) {
        if (arr[i] <= arr[pivot]) {
            swap(arr, i, j++);
        }
    }
    return j - 1;
}

quickSort(nums);
return nums[nums.length - k];

// 冒泡解法和归并排序解法
冒泡排序，记住是相邻的交换
// 思路: 它重复地走访过要排序的元素列,依次比较两个相邻的元素,如果顺序(如从大到小、首字母从Z到A)错误就把他们交换过来。
const bubbleSort = (nums) => {
    for (let i = nums.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) { // 每一趟把最大的往尾巴冒,讲究一个冒字
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
            }
        }
    }
}
bubbleSort(nums);
return nums[nums.length - k];

// 归并排序
const mergeSort = (nums) => {
    const len = nums.length;
    if (len < 2) {
        return nums;
    }
    const mid = len >> 1;
    const left = nums.slice(0, mid);
    const right = nums.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}
const merge = (left, right) => {
    let ans = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            ans.push(left.shift());
        } else {
            ans.push(right.shift());
        }
    }
    if (left.length) {
        ans = [...ans, ...left];
    }
    if (right.length) {
        ans = [...ans, ...right];
    }
    return ans;
}
const arr =  mergeSort(nums); // 归并排序不改变原数组，需要赋值
return arr[arr.length - k];
```

### 3、三数之和

leetcode地址：[三数之和](https://leetcode.cn/problems/3sum/description/?source=vscode)
*   题解：

```js
/**
 * @param {number[]} nums5mock1122
 * @return {number[][]} [1,2,3]
 */
var threeSum = function(nums) {
    nums.sort((a, b) =>  a - b);
    const len = nums.length;
    if (len < 3 || nums[0] > 0 || nums[nums.length - 1] < 0) {
        return [];
    }
    const ans = [];
    for (let i = 0; i < len; i++) {
        let cur = nums[i];
        if (cur > 0) {
            break;
        }
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        let left = i + 1, right = len - 1;
        while (left < right) {
            const sum = cur + nums[left] + nums[right];
            if (sum === 0) {
                ans.push([cur, nums[left], nums[right]]);
                while (left < right && nums[left + 1] === nums[left]) {
                    left++;
                }
                while (left < right && nums[right - 1] === nums[right]) {
                    right--;
                }
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return ans;
};
```

### 4、无重复字符的最长子串

leetcode地址：[无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/?source=vscode)

*   题解：

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if (s.length < 2) return s.length;
    const set = new Set();
    let left = 0; right = 0, ans = 0;
    while (right < s.length) {
        if (set.has(s[right])) {
            set.delete(s[left++]);
        } else {
            set.add(s[right++]);
            ans = Math.max(ans, set.size);
        }
    }
    return ans;
};
```

### 5、括号生成

leetcode地址：[括号生成](https://leetcode.cn/problems/generate-parentheses/?source=vscode)

*   题解：

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    // 思路: 回溯, dfs,只要左括号有剩，就可以选它，然后继续做选择（递归）
    // 思路: 减枝 右括号比左括号剩的多，才能选右括号

    const dfs = (left, right, str) => {
        if (str.length === (2 * n)) {
            ans.push(str);
            return;
        }
        if (left > 0) {
            dfs(left - 1, right, str + '(');
        }
        if (left < right) {
            dfs(left, right - 1, str + ')');
        }
    }
    const ans = [];
    dfs(n, n, '');
    return ans;
};
```

### 6、路径总和

leetcode地址：[路径总和](https://leetcode.cn/problems/path-sum/description/?source=vscode)

*   题解：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    // 思路: 递归,整个就是一个递归,把差值一直传下去

    let flag = false;
    const dfs = (root, sum) => {
        if (!root) return;
        sum += root.val;
        if (sum === targetSum && !root.left && !root.right) {
            flag = true;
        }
        dfs(root.left, sum);
        dfs(root.right, sum);
    }
    dfs(root, 0);
    return flag;

    // dfs解法
    // if (!root) return false;
    // if (!root.left && !root.right) {
    //     return targetSum === root.val;
    // }
    // return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};
```

### 7、杨辉三角

leetcode地址：[杨辉三角](https://leetcode.cn/problems/pascals-triangle/description/?source=vscode)

*   题解：

```js
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    // 简单模拟，下一行根据上一行推算
    const ans = [];
    for (let i = 1; i <= numRows; i++) {
        const temp = [], preArr = ans[ans.length - 1];
        for (let j = 0; j < i; j++) {
            if (j === 0 || j === i - 1) {
                temp.push(1);
            } else {
                temp.push(preArr[j - 1] + preArr[j]);
            }
        }
        ans.push(temp);
    }
    return ans;
};
```

### 8、比较版本号

leetcode地址：[165. 比较版本号](https://leetcode.cn/problems/compare-version-numbers/)

*   题解：

```js
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    // 思路: 字符串分割,别想复杂了，parseInt即可,前导0就会解决
    const [v1, v2] = [version1.split('.'), version2.split('.')];
    const len = Math.max(v1.length, v2.length);
    for (let i = 0 ; i < len; i++) {
        const num1 = v1[i] ? parseInt(v1[i]) : 0; // 没有就是0
        const num2 = v2[i] ? parseInt(v2[i]) : 0; // 没有就是0
        if (num1 > num2) {
            return 1;
        }
        if (num1 < num2) {
            return -1;
        }
    }
    return 0;
};
```

### 9、环形链表

leetcode地址：[141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)


*   题解：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // 思路: 快慢指针 或者 哈希

    // 快慢指针
    let fast = head, slow = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) {
            return true;
        }
    }
    return false;

    // 哈希
    // const set = new Set();
    // while(head) {
    //     if (set.has(head)) {
    //         return true;
    //     }
    //     set.add(head);
    //     head = head.next;
    // }
    // return false; // 循环完毕没有环，输出false
};
```

### 10、回文链表

leetcode地址:[234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)


*   解答：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if (!head) {
        return true;
    }

    const compare = (headA, headB) => {
        while (headB) {
            if (headA.val !== headB.val) {
                return false;
            }
            headA = headA.next;
            headB = headB.next;
        }
        return true;
    }

    // 翻转链表
    const reverse = (head) => {
        let pre = null, cur = head, next = null;
        while (cur) {
            next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        return pre;
    }

    // 获取中点
    const getMid = (head) => {
        let fast = head, slow = head;
        while (fast?.next?.next) {
            fast = fast.next.next;
            slow = slow.next;
        }
        return slow;
    }

    const mid = getMid(head);
    const B = reverse(mid.next);
    const ans = compare(head, B);
    mid.next = reverse(B);
    return ans;
};
```

### 11、相交链表

leetcode地址：[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

*   题解：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    // 思路: 你走过我走过的路，终究会都走过

    // 我走过你走过的路，最终都会相遇
    let A = headA, B = headB;
    while (A !== B) {
        A = A ? A.next : headB;
        B = B ? B.next : headA;
    }
    return A;


    // 哈希
    // const set = new Set();
    // let cur = headA;
    // while(cur) {
    //     set.add(cur);
    //     cur = cur.next;
    // }
    // cur = headB;
    // while(cur) {
    //     if (set.has(cur)) {
    //         return cur;
    //     }
    //     cur = cur.next;
    // }
    // return null;


    // 先长度一致，然后开始一起走;
    //    let a = 0, b = 0;
    //    let tempA = headA, tempB = headB;
    //    while(tempA) {
    //        a++;
    //        tempA = tempA.next;
    //    }
    //    while(tempB) {
    //        b++;
    //        tempB = tempB.next;
    //    }
    //    let short = a < b ? headA : headB;
    //    let long = a < b ? headB : headA;
    //    let dis = Math.abs(a - b);
    //    while (dis) {
    //     long = long.next;
    //     dis--;
    //    }
    //    while(short) {
    //     if (short === long) {
    //         return short;
    //     }
    //     short = short.next;
    //     long = long.next;
    //    }
    //    return null;
};
```

### 12、LRU 缓存

leetcode地址：[146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)

*   题解：

```js
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.map = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (!this.map.has(key)) {
        return -1;
    } else {
        const temp = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, temp);
        return temp;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.map.has(key)) {
        this.map.delete(key);
    }
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
        this.map.delete(this.map.keys().next().value);
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```

### 13、遍历二叉树（前中后序）

leetcode地址:[遍历二叉树](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

*   题解

```js
// 递归写法，不推荐
const ans = [];
const dfs = (node) => {
    if (!node) {
        return;
    }
    ans.push(node.val); // 前中后move这行
    dfs(node.left);
    dfs(node.right);
}
dfs(root);
return ans;

// stack写法

// 前序遍历
if (!root) return [];
const ans = [], stack = [root];
while (stack.length) {
    const node = stack.pop(); // 用shift的话就变成层序遍历了，必须先右后左
    ans.push(node.val);
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
}
return ans;

// 中序遍历
if (!root) return [];
const ans = [], stack = [];
while (root || stack.length) {
    if (root) {
        stack.push(root);
        root = root.left;
    } else {
        root = stack.pop();
        ans.push(root.val);
        root = root.right;
    }
}
return ans;

// 后序遍历
if (!root) return [];
const ans = [], stack = [root];
while (stack.length) {
    const node = stack.pop(); // 用shift的话就变成层序遍历了
    ans.push(node.val);
    node.left && stack.push(node.left); // 先左再右出来就是根右左
    node.right && stack.push(node.right);
}
return ans.reverse(); // 从 根 右 左  到 左右根为后序遍历
```

### 14、对称二叉树

leetcode地址：[对称二叉树](https://leetcode.cn/problems/symmetric-tree/description/?source=vscode)

*   题解：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    // 思路: 递归 外外 内内对比,注意先判单空，再全空 再左右值对比，再比left.left, right.right和left.right, right.left

    if (!root) {
        return true;
    }

    const queue = [];
    queue.push(root.left);
    queue.push(root.right);

    while (queue.length) {
        const left = queue.shift();
        const right = queue.shift();
        if (!left && !right) {
            continue;
        }
        if (!left || !right || left.val !== right.val) {
            return false;
        }
        queue.push(left.left);
        queue.push(right.right);
        queue.push(left.right);
        queue.push(right.left);
    }
    return true;


    // 递归解法
    // const compare = (left, right) => {
    //     if ((left && !right) || (!left && right)) {
    //         return false;
    //     } else if (!left && !right) {
    //         return true;
    //     } else if (left.val !== right.val) {
    //         return false;
    //     }
    //     return compare(left.left, right.right) && compare(left.right, right.left);
    // }

    // if (!root) {
    //     return true;
    // }

    // return compare(root.left, root.right);
};
```

### 15、二叉树的最大深度

leetcode地址：[二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/?source=vscode)


*   题解：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    // 递归解法
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;

    // bfs 解法
    if (!root) return 0;
    let res = 0;
    const queque = [root];
    while(queque.length > 0) {
        let len = queque.length;
        while(len) {
            const node = queque.shift();
            if(node.left) queque.push(node.left);
            if(node.right) queque.push(node.right);
            len--;
        }
        res++
    }
    return res;
};
```

### 16、二叉树的右视图

leetcode地址:[199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/)

*   解答：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    if (!root) return [];
    const ans = [], queue = [root];
    while(queue.length) {
        ans.push(queue[0].val);
        let len = queue.length;
        while (len--) {
            const node = queue.shift();
            node.right && queue.push(node.right);
            node.left && queue.push(node.left);
        }
    }
    return ans;
};
```

### 17、翻转二叉树

leetcode地址:[226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

*   解答：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    // DFS
    if (!root) return null;
    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
    return root;
    
    // BFS
    // if (!root) return null;
    // const queue = [root];
    // while(queue.length) {
    //     const node = queue.shift();
    //     [node.left, node.right] = [node.right, node.left];
    //     node.left && queue.push(node.left);
    //     node.right && queue.push(node.right);
    // }
    // return root;
};
```

### 18、求根节点到叶节点数字之和

leetcode地址：[129. 求根节点到叶节点数字之和](https://leetcode.cn/problems/sum-root-to-leaf-numbers/)

*   题目描述：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8ce29220747e48cab8207a251a1889f3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5omT5pu05Lq6ZXI=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDA3MjI0Njc5ODQ2MDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725360540&x-orig-sign=4yjV%2B2v0btBmlwgxZKacCa8H5gA%3D)

*   题解：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    // 思路: dfs * 10 进位

    // dfs,直接 * 10 进位,个位数往后累加
    const dfs = (root, sum) => {
        if (!root) return;
        sum = sum * 10 + root.val;
        if (!root.left && !root.right) {
            ans += sum;
        }
        dfs(root.left, sum);
        dfs(root.right, sum);
    }
    let ans = 0;
    dfs(root, 0);
    return ans;
};
```

### 19、二叉搜索树的最近公共祖先

leetcode地址:[235. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/)

*   题目描述：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b7548a7e6092443195288b9f731867f3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5omT5pu05Lq6ZXI=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDA3MjI0Njc5ODQ2MDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725360540&x-orig-sign=HnjeXlfBqXSfvsxKCh0GVfbp51g%3D)

*   解答：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    // 二叉搜索树,判断都大于比left或者都小于比right

    //dfs
    if (!root) {
        return null;
    }
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q);
    } else if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestor(root.right, p, q);
    } else {
        return root;
    }

    // 迭代
    // while (root) {
    //     if (root.val > p.val && root.val > q.val) {
    //         root = root.left;
    //     } else if (root.val < p.val && root.val < q.val) {
    //         root = root.right
    //     } else {
    //         return root;
    //     }
    // }
    // return null;
};
```

### 20、最长递增子序列(Vue3.0diff算法优化点)

leetcode地址:[300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)

*   解答：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    // 贪心 + 二分
    const tails = [];
    for (const num of nums) {
        if (!tails.length || num > tails[tails.length - 1]) {
            tails.push(num);
        } else {
            let left = 0, right = tails.length - 1;
            while (left < right) {
                const mid = left + ((right - left) >> 1);
                if (tails[mid] < num) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            tails[left] = num;
        }
    }
    return tails.length;

    // 思路: dp 取i 和 j + 1的值的最大值, j 为 0 到 i - 1

    // const dp = new Array(nums.length).fill(1);

    // for(let i = 1; i < nums.length; i++) {
    //     for(let j = 0; j < i; j++) {
    //         if(nums[j] < nums[i]) {
    //             dp[i] = Math.max(dp[i], dp[j]+1);
    //         }
    //     }
    // }

    // return Math.max(...dp);
};
```

### <span id ="ym">vue3中关于算出最长递增子序列的源码</span>

*   vue官方的做法是：首先，创建一个反向链表用于后续回溯修正，之后的做法和前面的解题思路大致相同，都是创建一个数组作为最终的最长递增子序列结果，然后遍历原数组，并根据情况把原数组中当前遍历的值插入result数组末尾或是对其中第一个大于该值的值进行替换（这里vue官方采用了二分查找的方式提高了查找效率），只不过这里因为最后需要进行回溯修正，因此选择的是存储遍历到的数在原数组中对应的索引而非这个值，同时，还需要在直接创建的反向链表中记录当前插入result数组中的值的前置指针。当原数组遍历完成过后再通过之前记录的反向链表进行一次回溯修正，最后result中记录的就是原数组中最长子序列对应值的索引数组，返回result用于后续diff计算。

```js
function getSequence(arr: number[]): number[]{
    const p = arr.slice(); // 创建一个原数组的复制，用于反向链表
    const result = [0];  // 定义结果数据，用于返回最终的结果
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {  // 遍历原数组
        const arrI = arr[i];
        if (arrI !== 0) {
            j = result[result.length - 1]; // 获取最后一位的索引
            if (arr[j] < arrI) {  // 判断结果序列中的最后一位是否小于当前值，如果是，则记录反向链表
                p[i] = j;  // 在反向链表当前位置记录结果序列中的这个位置的指针（也就是当前值对于的前置值的指针）
                result.push(i); // 同时把i记录到结果序列的末尾
                continue;
            }
            // 这里开始是二分查找的逻辑，找到第一个比当前值大的值
            u = 0;
            v = result.length - 1;
            while (u < v) {
                c = (u + v) >> 1;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                } else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1]; // 同时，记录反向链表
                }
                result[u] = i; // 用当前索引i替换原来的索引
            }
        }
    }
    // 这里开始就是回溯修正
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {  // 从后往前回溯
        result[u] = v;
        v = p[v];
    }
    return result;
}

```
