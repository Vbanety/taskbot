    const {boards} = require('../models/BoardModel');
    module.exports = (interaction) => {
async function createBoard(name, user) {
    const boardExist = await boards.findOne({ name, user: user });
    if (boardExist) {
        throw new Error(`Board **${name}** already exists!`);
    return 
     }

    const board = new boards({
        name,
        tasks: [],
        members: [],
        user: user,
    });

    await board.save();
}

async function deleteBoard(name, user) {
    const board = await boards.findOne({ name, user: user }) || await boards.findOne({ name, members: { $elemMatch: { id: user } } }); 
    if (!board) {
        throw new Error(`Board **${name}** not found!`);
    } else if (board.user !== user) {
        throw new Error(`You are not the owner of board **${name}**!`);
    }
    await boards.deleteOne({ name, user: user });
}

async function getBoard(name, user) {
    return await boards.findOne({ name, user: user }) || await boards.findOne({ name, members: { $elemMatch: { id: user } } });
}

async function addTaskToBoard(boardName, task, user) {
    const board = await getBoard(boardName, user);
    if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
    }

    board.tasks.push(task);
    board.markModified('tasks');
    await board.save();
}

async function removeTaskFromBoard(boardName, task, user) {
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
}

async function listTasks(boardName, user) {
    const board = await getBoard(boardName, user);
    if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
    }

    return board.tasks;
}

async function moveTaskBetweenBoards(fromBoardName, toBoardName, task, user) {
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
}

async function changeTaskStatus(boardName, task, status, user) {
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
}

async function addMemberToBoard(boardName, member, user) {
    const board = await getBoard(boardName, user);
    if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
    } else if (board.members.find(m => m.id === member.id)) {
        throw new Error(`Member **${member}** already exists in board **${boardName}**!`);
    }

    board.members.push(member);
    board.markModified('members');
    await board.save();
}

async function removeMemberFromBoard(boardName, member, user) {
    const board = await getBoard(boardName, user);
    if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
    } else if (!board.members.find(m => m.id === member.id)) {
        throw new Error(`Member **${member}** not found in board **${boardName}**!`);
    }

    board.members = board.members.filter(m => m.id !== member.id);
    board.markModified('members');
    await board.save();
}

async function listMembers(boardName, user) {
    const board = await getBoard(boardName, user);
    if (!board) {
        throw new Error(`Board **${boardName}** not found!`);
    }

    return board.members;
}

async function changeTaskPriority(boardName, task, priority, user) {
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
}

return {
    createBoard,
    deleteBoard,
    addTaskToBoard,
    removeTaskFromBoard,
    listTasks,
    moveTaskBetweenBoards,
    changeTaskStatus,
    addMemberToBoard,
    removeMemberFromBoard,
    listMembers,
    changeTaskPriority,
    getBoard
};

}