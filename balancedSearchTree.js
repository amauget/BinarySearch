/* The objective is to create a balanced binary search tree using a class and recursive funciton. */

class Node{ /* individual tree leaves */
  constructor(data){
    this.data = data
    this.left = null
    this.right = null
  }
}

class Tree{ /* node path skeleton */
  constructor(root){ 
    this.root = root
  }

  insert(value, currentNode = this.root){ 
    if(currentNode === null){ 
      /* null is only encountered in the position where value belongs 
      due to conditionals below */
      return new Node(value)
    }
    if(value < currentNode.data){
      currentNode.left = this.insert(value, currentNode.left)
    }
    else if(value > currentNode.data){
      currentNode.right = this.insert(value, currentNode.right)
    }
    return currentNode
  }
  deleteItem(value, currentNode = this.root){
    if(currentNode === null){
      return currentNode
    }   
    if(value < currentNode.data){
      currentNode.left = this.deleteItem(value, currentNode.left)
    }
    else if(value > currentNode.data){
      currentNode.right = this.deleteItem(value, currentNode.right)
    }
    else{
      const minValue = (currentNode) => {
        let minv = currentNode.data
        while (currentNode.left !== null) {
            minv = currentNode.left.data
            currentNode = currentNode.left
        }
        return minv
      }

      if(currentNode.left === null){
        return currentNode.right
      }
      else if(currentNode.right === null){
        return currentNode.left
      }
      currentNode.data = minValue(currentNode.right)

      currentNode.right = this.deleteItem(value, currentNode.right)
    }
    
    return currentNode
  }
  find(value, currentNode = this.root){
    if(currentNode === null || currentNode.data === value){
      // console.log('Here is the location')
      return currentNode
    }
     
    else if(currentNode.data > value){
      return this.find(value, currentNode.left)
      
    }
    else if(currentNode.data < value){
      return this.find(value, currentNode.right)
      
    }
  }
  levelOrder() {
    let row = this.height(this.root);
    let array = []

    for (let i = 1; i <= row; i++)
      appendCurrentLevel(this.root, i);
    // Compute the "height" of a tree -- the number 
    // of nodes along the longest path
    // from the root node down to the farthest leaf node.
  

    // Print nodes at the current level
    function appendCurrentLevel(root , level) {
        if (root === null) {/* non entry */
            return
        }
        if (level === 1){
            return array.push(root.data)        
        }
        else if (level > 1) {
            appendCurrentLevel(root.left, level - 1)

            appendCurrentLevel(root.right, level - 1)
            
        }

    }
    return array
  }
  height(root) {
    if (root == null)
        return 0;
    else {
        // Compute height of each subtree
        let left = this.height(root.left);
        let right = this.height(root.right);

        // Use the larger one
        if (left > right)
            return (left + 1);
        else
            return (right + 1);
    }
  }
  inOrder(root){
    /* left, root, right */
    if(root === null){
      return
    }
    if(root.left === null){
      if(root.right !== null){
        return root.right
      }
      return root
    }
    else{}

  }
  preOrder(node = this.root, array = []){
    /* root, left, right */
    if(node === null){
      return 
    }
    else{
      array.push(node.data)
    }
    
    
    this.preOrder(node.left, array)

    this.preOrder(node.right, array)
    
    return array
  }
  postOrder(node = this.root, array = []){
    /* left, right, root */
    if(node === null){
      return
    }
    else{
      this.postOrder(node.left, array) /* traverses left */
      this.postOrder(node.right, array)/* traverses right */
      /* final return value is root, which is appended last. */
      array.push(node.data)
    } 
    return array
  }
  depth(value, node = this.root, level = 0){
    /* returns given node's depth: ie. number of edges in the path from node to the root */
    if(node === null){
      return
    }
    if(node.data === value){
      level = `"${value}"` + ' has a depth of: ' + level
      return level
    }
    else if(node.data > value){
      level += 1
      return this.depth(value, node.left, level)
    }
    else if(node.data < value){
      level += 1
      return this.depth(value, node.right , level)
    }
  }
  isBalanced(root = this.root){
     
    // Base condition
    if(root == null)
        return true
 
    // for left and right subtree height
    let left = this.height(root.left)
    let right = this.height(root.right)
 
    // allowed values for (lh - rh) are 1, -1, 0
    if (Math.abs(left - right) <= 1 && this.isBalanced(
    root.left)== true && this.isBalanced( root.right) == true){
        return true
    }
 
    // if we reach here means tree is not 
    // height-balanced tree
    return false
  }
  rebalance(){
    let array = (this.preOrder()).sort((a, b) => a-b)
    let start = 0
    let end = array.length - 1

    this.root = buildTree(array, start, end)
    
    return this.root
  }


}

function buildTree(array, start, end){
  if(start > end){
    return null
  }
  let middle = parseInt((start + end) / 2)
  let node = new Node(array[middle]) /* creates new search section node. */
 
  node.left = buildTree(array, start, middle - 1) /* updates end value */

  node.right = buildTree(array, middle + 1, end) /* updates start value */

  return node
}

const prettyPrint = (node /* root */, prefix = "", isLeft = true) => { /* Creates a visual tree associated with tree Obj */
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


function initiate(){
  let root = null
  let array = generateArray() /* random array. range 0 - 10,000   length: 100 */
  
  let start = 0
  let end = array.length - 1
  
  root = buildTree(array, start, end )
  

  let tree = new Tree(root) /* object constructed of the Node objects. */
  console.log(tree.isBalanced()) /*  output: True */
  console.log(tree.levelOrder()) /* verified */
  console.log(tree.preOrder())  /* verified */
  console.log(tree.postOrder())/* verified */
  
  /* unbalance below: */
  tree.insert(10001)
  tree.insert(10002)
  tree.insert(10003)
  tree.insert(10004)
  tree.insert(10005)
  
  console.log(tree.isBalanced()) /* output: False */

  tree.rebalance()
  
  console.log(tree.isBalanced()) /* output: True */

  console.log(tree.levelOrder()) /* verified */
  console.log(tree.preOrder())  /* verified */
  console.log(tree.postOrder())/* verified */



  // prettyPrint(root)
  
  // let numArray = new Float64Array([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

  // let cleanData = [...new Set(numArray.sort())] /* sorts from least -> greatest and removes duplicates. This is a faster method of conversion */
  /* 
    cleanData =  [ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345 ] 
  */

  duplicateVerify(array)
}

function generateArray(){
  let array = []
  for(let i = 0; i < 100; i++){
    let number = Math.floor(Math.random() * 101)
    number = number ** 2
    if(!array.includes(number)){
      array.push(number)

    }
    else{
      i -= 1
    }
  }
  return array.sort((a,b) => a - b)
}
function duplicateVerify(array){
  for(i of array){
    if(array.includes(i) > 1){
      return true
    }
  }
  
  return false
}

 initiate()

