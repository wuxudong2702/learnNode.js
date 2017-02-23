var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var command = args.shift();
// shift()删除数组中第一个值，并改值其返回
var taskDescription = args.join();
var file = path.join(process.cwd(), '/.tasks');
// process.cwd()返回进程目前的工作路径

switch(command) {
    case 'list':
        listTasks(file);
        break;
    case 'add':
        addTask(file, taskDescription);
        break;
    default:
        console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription]');
}

function loadOrInitializeTaskArray(file, cb) {
    fs.exists(file, function(exists) {
        var tasks = [];
        if(exists) {
            fs.readFile(file, 'utf8', function(err, data) {
                if(err) throw err;
                var data = data.toString();
                var tasks = JSON.parse(data || '[]');
// JSON.parse() 方法解析一个JSON字符串，构造由字符串描述的JavaScript值或对象。
// 可以提供可选的reviver函数以在返回之前对所得到的对象执行变换。
                cb(tasks);
            });
        }else {
            cb([]);
        }
    }); 
}

function listTasks(file) {
    loadOrInitializeTaskArray(file, function(tasks) {
        for(var i in tasks) {
            console.log(tasks[i]);
        }
    });
}

function storeTasks(file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf8', function(err) {
// JSON.stringify() 方法将JavaScript值转换为JSON字符串，
// 如果指定了replacer函数，则可以替换值，
// 或者如果指定了replacer数组，则可选地仅包括指定的属性。
        if(err) throw err;
        console.log("Saved.");
    });
}

function addTask(file, taskDescription) {
    loadOrInitializeTaskArray(file, function(tasks) {
        tasks.push(taskDescription);
        storeTasks(file, tasks);
    });
}