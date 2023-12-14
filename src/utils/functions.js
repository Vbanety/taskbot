const { boards } = require('../models/BoardModel');

module.exports = () => {
  async function createBoard(name, user) {
    try {
      const boardExist = await boards.findOne({ name, user: user });
      if (boardExist) {
        throw new Error(`Board **${name}** already exists!`);
      }

      const board = new boards({
        name,
        tasks: [],
        members: [],
        user: user,
      });

      await board.save();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create board.');
    }
  }

  async function deleteBoard(name, user) {
    try {
      const board = await boards.findOne({ name, user: user }) || await boards.findOne({ name, members: { $elemMatch: { id: user } } });
      if (!board) {
        throw new Error(`Board **${name}** not found!`);
      } else if (board.user !== user) {
        throw new Error(`You are not the owner of board **${name}**!`);
      }
      await boards.deleteOne({ name, user: user });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete board.');
    }
  }

  async function getBoard(name, user) {
    try {
      return await boards.findOne({ name, user: user }) || await boards.findOne({ name, members: { $elemMatch: { id: user } } });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get board.');
    }
  }

  async function addTaskToBoard(boardName, task, user) {
    try {
      const board = await getBoard(boardName, user);
      if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
      }

      board.tasks.push(task);
      board.markModified('tasks');
      await board.save();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to add task to board.');
    }
  }

  async function removeTaskFromBoard(boardName, task, user) {
    try {
      const board = await getBoard(boardName, user);
      if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
      } else if (!board.tasks.find(t => t.name === task)) {
        throw new Error(`Task **${task}** not found in board **${boardName}**!`);
      } else if (board.user !== user) {
        throw new Error(`You are not the owner of board **${boardName}**!`);
      }

      board.tasks = board.tasks.filter(t => t.name !== task);
      board.markModified('tasks');
      await board.save();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to remove task from board.');
    }
  }

  async function listTasks(boardName, user) {
    try {
      const board = await getBoard(boardName, user);
      if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
      }

      return board.tasks;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to list tasks.');
    }
  }

  async function moveTaskBetweenBoards(fromBoardName, toBoardName, task, user) {
    try {
      const fromBoard = await getBoard(fromBoardName, user);
      const toBoard = await getBoard(toBoardName, user);

      if (!fromBoard || !toBoard) {
        throw new Error(`Either board **${fromBoardName}** or board **${toBoardName}** not found!`);
      }

      const taskToMove = fromBoard.tasks.find(t => t.name === task);
      if (!taskToMove) {
        throw new Error(`Task **${task}** not found in board **${fromBoardName}**!`);
      }

      fromBoard.tasks = fromBoard.tasks.filter(t => t.name !== task);
      toBoard.tasks.push(taskToMove);
      fromBoard.markModified('tasks');
      await fromBoard.save();
      toBoard.markModified('tasks');
      await toBoard.save();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to move task between boards.');
    }
  }

  async function changeTaskStatus(boardName, task, status, user) {
    try {
      const board = await getBoard(boardName, user);
      if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
      }

      const taskToChange = board.tasks.find(t => t.name === task);
      if (!taskToChange) {
        throw new Error(`Task **${task}** not found in board **${boardName}**!`);
      }

      taskToChange.status = status;
      taskToChange.last_updated = Date.now();

      board.markModified('tasks');
      await board.save();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to change task status.');
    }
  }

  async function addMemberToBoard(boardName, member, user) {
    try {
      const board = await getBoard(boardName, user);
      if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
      } else if (board.members.find(m => m.id === member.id)) {
        throw new Error(`Member **${member}** already exists in board **${boardName}**!`);
      }

      board.members.push(member);
      board.markModified('members');
      await board.save();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to add member to board.');
    }
  }

  async function removeMemberFromBoard(boardName, member, user) {
    try {
      const board = await getBoard(boardName, user);
      if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
      } else if (!board.members.find(m => m.id === member.id)) {
        throw new Error(`Member **${member}** not found in board **${boardName}**!`);
      }

      board.members = board.members.filter(m => m.id !== member.id);
      board.markModified('members');
      await board.save();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to remove member from board.');
    }
  }

  async function listMembers(boardName, user) {
    try {
      const board = await getBoard(boardName, user);
      if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
      }

      return board.members;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to list members.');
    }
  }

  async function changeTaskPriority(boardName, task, priority, user) {
    try {
      const board = await getBoard(boardName, user);
      if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
      }

      const taskToChange = board.tasks.find(t => t.name === task);
      if (!taskToChange) {
        throw new Error(`Task **${task}** not found in board **${boardName}**!`);
      }

      taskToChange.priority = priority.toLowerCase();
      taskToChange.last_updated = Date.now();

      board.markModified('tasks');
      await board.save();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to change task priority.');
    }
  }

  return {
    createBoard,
    deleteBoard,
    getBoard,
    addTaskToBoard,
    removeTaskFromBoard,
    listTasks,
    moveTaskBetweenBoards,
    changeTaskStatus,
    addMemberToBoard,
    removeMemberFromBoard,
    listMembers,
    changeTaskPriority,
  };
};