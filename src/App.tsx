import React from 'react';
import TypingThroughInput from './components/TypingThroughInput';
import 'tailwindcss/tailwind.css';

const App = () => {
  const code = `  class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  root: TreeNode | null;

  constructor(root: TreeNode | null = null) {
    this.root = root;
  }

  inOrder(): number[] {
    const result: number[] = [];

    const traverse = (node: TreeNode | null) => {
      if (node === null) {
        return;
      }

      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    };

    traverse(this.root);
    return result;
  }

  preOrder(): number[] {
    const result: number[] = [];

    const traverse = (node: TreeNode | null) => {
      if (node === null) {
        return;
      }

      result.push(node.value);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
    return result;
  }

  postOrder(): number[] {
    const result: number[] = [];

    const traverse = (node: TreeNode | null) => {
      if (node === null) {
        return;
      }

      traverse(node.left);
      traverse(node.right);
      result.push(node.value);
    };

    traverse(this.root);
    return result;
  }

  static buildSampleTree(): BinaryTree {
    const rootNode = new TreeNode(1);
    rootNode.left = new TreeNode(2);
    rootNode.right = new TreeNode(3);
    rootNode.left.left = new TreeNode(4);
    rootNode.left.right = new TreeNode(5);
    rootNode.right.left = new TreeNode(6);
    rootNode.right.right = new TreeNode(7);

    return new BinaryTree(rootNode);
  }
}

// Usage example
const tree = BinaryTree.buildSampleTree();
console.log(tree.inOrder()); // Output: [4, 2, 5, 1, 6, 3, 7]
console.log(tree.preOrder()); // Output: [1, 2, 4, 5, 3, 6, 7]
console.log(tree.postOrder()); // Output: [4, 5, 2, 6, 7, 3, 1]
`;

  return (
    <div className='container mx-auto flex flex-col p-4'>
      <div className='mb-4'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>
          Typing Practice using Code
        </h1>
        <h6 className='text-sm sm:text-base md:text-lg'>
          using React Typing Game Hook
        </h6>
      </div>
      <h5 className='text-xs sm:text-sm md:text-base'>Esc to reset</h5>
      <div className='border-2 p-4 rounded-lg'>
        <h1 className='mb-2 text-lg sm:text-xl md:text-2xl'>
          Practice Typing React TSX Code
        </h1>
        <TypingThroughInput text={code} />
      </div>
    </div>
  );
};

export default App;
