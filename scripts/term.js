let image = {
    "fileSystem": {
        "/": {
            "files": {
                "file1.txt": "contents",
                "file2.txt": "contents2",
                "skibidi.png": $('<img src="https://static.wikia.nocookie.net/skibidi-toilet-official/images/b/b1/GiantST.png/revision/latest/thumbnail/width/360/height/360?cb=20240205231829">')
            },
            "home": {
                "alex" : {
                    "file1223123.txt" : "content"
                }
            },
            "file.txt": "hi"
        }
    }
};

let workingDirectory = "/";

$("#term").terminal({
    hello: function(what) {
        this.echo('Hello, ' + what +
                  '. Wellcome to this terminal.');
    },
    echo: function(...args) {
        this.echo(args);
    },
    pwd: function() {
        this.echo(workingDirectory);
    },
    ls: function() {
        wd = lookUp(workingDirectory)
        for (const key in wd) {
            console.log(typeof wd[key]);
            if(typeof wd[key] == "object"){
                this.echo("[[;orange;]" + key + "]")
            }
            else {
                this.echo(key);
            }
        }
    },
    cd: function(path) {

        wd = lookUp(path, true);
        if(wd == false){
            this.echo(path + ": No such directory");

        }
        if(typeof wd != "object") {
            this.echo(path + ": Not a directory");
        }


        
    },
    skibidi: function() {
        this.echo($('<img src="https://static.wikia.nocookie.net/skibidi-toilet-official/images/b/b1/GiantST.png/revision/latest/thumbnail/width/360/height/360?cb=20240205231829">'));
    },
    gwomp: function() { 
        this.echo($('<img src="https://preview.redd.it/7hsu9d7bo1q81.jpg?width=1080&crop=smart&auto=webp&s=fa486f1f8502d7908af117ef1b902357f63bb0c0">'));
    },
    cat: function(path) {
        wd = lookUp(path);
        this.echo(wd);
    },
    open: function(path) {
        wd = lookUp(path);
        this.echo(wd);
    },
    help: function() {
        this.echo("ls: list content of current directory");
        this.echo("pwd: print working directory");
        this.echo("cd <path>: change directory");
        this.echo("cat <filepath>: print file contents (can also use open <filepath>)");
        this.echo("gwomp: gwomp");
    },
    // eval: function(ev) {
    //     this.echo(eval(ev));
    // }

}  ,
 {
    checkArity: false,
    greetings: 'Hi',
    prompt() {
        return "[[;orange;]" + workingDirectory + "] $ ";
    },
});

function lookUp(path, cd) {
    if (path == undefined){
        return false;
    }
    if(path.startsWith('..')) {
        let dirs = workingDirectory.split('/');
        let parentPath = "/";
        for(let i = 0; i < dirs.length - 1; i++) {
            parentPath += dirs[i];
        }
        console.log(parentPath);

        if(path.length > 3){
            let toAdd = path.substring(2);
            if (parentPath == "/"){
                toAdd = path.substring(3);
            }
            return lookUp(parentPath + toAdd);
        }
        
        
        path = parentPath;

    }
    

    else if(path.charAt(0) != "/") {
        if(workingDirectory.charAt(workingDirectory.length - 1) != "/") {
            workingDirectory += "/"
        }
        path = workingDirectory + path;
    }

    let wd = image.fileSystem["/"];
    if (path == "/") {
        workingDirectory = path;
        return wd;
    }
    let paths = path.split('/');


    for (let i = 1; i < paths.length; i++) {
        if (paths[i] in wd) {
            wd = wd[paths[i]];
            if(cd){
                workingDirectory = path;
            }
        }
        else {
            return false;
        }
    }

    return wd;
    
}

