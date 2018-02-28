# nodejs中的stream #

在nodejs中可以通过fs模块读写文件，我们来看下fs模块提供的接口：

        fs.readFile(filename, callback)异步读取文件。

        filename是读取文件的文件名，如果是相对路径，则通过当前进程执行的路径来查找文件。
        回调函数有两个参数callback(err, buffer)
        第一个参数为err(如果没有报错，该参数值为null)，进行操作时，应先判断err是否有值。
        第二个参数是代表文件内容的Buffer实例。
        fs.writeFile(filename, content [, encode], callback)
        异步写入文件，content为写入内容字符串, encode为编码(默认utf8)
        对应的cb回调函数中只有err一个参数(若无报错为null);

        这两个方法有相应的同步版本:
        fs.readFileSync(filename [,encode])
        第二个参数可以是表示编码的字符串，也可以是一个配置对象({encoding: null, flag: 'r'})
        即默认编码是null，读取模式为r(只读)。
        如果不指定编码方式，fs返回一个表示文件内容的Buffer实例，否则返回字符串。
        fs.writeFileSync(filename, content, encode)
        filename表示文件名，content是要写入的字符串内容，encode是文件内容编码方式。
        通过这几个接口我们可以完成简单的文件读写工作：

        var fs = require('fs');
        var source = fs.readFileSync('/path/to/source', {encoding: 'utf8'});

        fs.writeFileSync('/path/to/dest', source); 
        上面几个接口，无论是异步或是同步，都是等文件读取完成，才进行操作的。
        如果操作对象是一些小文件，这种操作没有什么问题。
        但是在服务器端，文件体积一般很庞大，用这种方式效率低下，导致线程阻塞，
        甚至会因为内存不足而崩溃。

- 这里要引用Stream流的概念。

        nodejs中Stream是EventEmitter的实现，你可以理解为在程序后台打开了一个文件(不占用主线程)，
        程序会一点一点的读取(写入)文件，通过事件和回调来完成文件的读写。来看个例子

        var fs = require('fs');
        // 创建一个可读流
        var readStream = fs.createReadStream('/path/to/source');
        var writeStream = fs.createWriteStream('/path/to/dest');

        readStream.on('data', function(chunk){
          // 可读流收到data事件时，将内容写入到可写流
          writeStream.write(chunk);
        });

        readStream.on('end', function(){
          // 当可读流读取完成，会发出end事件，这时我们要把可写流关闭
          writeStream.end();
        });
        当调用fs.createReadStream时，相当于创建了一个文件读取流。
        可以通过监听data事件，来获取读取的部分数据，来进行一些操作。

        也可以用pipe的写法：

        fs.createReadStream('/path/to/source')
          .pipe(fs.createWriteStream('/path/to/dest'))

- 实例

        Stream在nodejs中是EventEmitter的实现，并且有多种实现形式，例如：

        http responses request
        fs read write streams
        zlib streams
        tcp sockets
        child process stdout and stderr
        上面的文件复制可以简单实现一下：

        var fs = require('fs');
        var readStream = fs.createReadStream('/path/to/source');
        var writeStream = fs.createWriteStream('/path/to/dest');

        readStream.on('data', function(chunk) { // 当有数据流出时，写入数据
            writeStream.write(chunk);
        });

        readStream.on('end', function() { // 当没有数据时，关闭数据流
            writeStream.end();
        });
        上面的写法有一些问题，如果写入的速度跟不上读取的速度，有可能导致数据丢失。
        正常的情况应该是，写完一段，再读取下一段，如果没有写完的话，就让读取流先暂停，等写完再继续，于是代码可以修改为：

        var fs = require('fs');
        var readStream = fs.createReadStream('/path/to/source');
        var writeStream = fs.createWriteStream('/path/to/dest');

        readStream.on('data', function(chunk) { // 当有数据流出时，写入数据
            if (writeStream.write(chunk) === false) { // 如果没有写完，暂停读取流
                readStream.pause();
            }
        });

        writeStream.on('drain', function() { // 写完后，继续读取
            readStream.resume();
        });

        readStream.on('end', function() { // 当没有数据时，关闭数据流
            writeStream.end();
        });
        或者使用更直接的pipe

        // pipe自动调用了data,end等事件
        fs.createReadStream('/path/to/source').pipe(fs.createWriteStream('/path/to/dest'));
        下面是一个更加完整的复制文件的过程

        var fs = require('fs'),
            path = require('path'),
            out = process.stdout;

        var filePath = '/Users/chen/Movies/Game.of.Thrones.S04E07.1080p.HDTV.x264-BATV.mkv';

        var readStream = fs.createReadStream(filePath);
        var writeStream = fs.createWriteStream('file.mkv');

        var stat = fs.statSync(filePath);

        var totalSize = stat.size;
        var passedLength = 0;
        var lastSize = 0;
        var startTime = Date.now();

        readStream.on('data', function(chunk) {

            passedLength += chunk.length;

            if (writeStream.write(chunk) === false) {
                readStream.pause();
            }
        });

        readStream.on('end', function() {
            writeStream.end();
        });

        writeStream.on('drain', function() {
            readStream.resume();
        });

        setTimeout(function show() {
            var percent = Math.ceil((passedLength / totalSize) * 100);
            var size = Math.ceil(passedLength / 1000000);
            var diff = size - lastSize;
            lastSize = size;
            out.clearLine();
            out.cursorTo(0);
            out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');
            if (passedLength < totalSize) {
                setTimeout(show, 500);
            } else {
                var endTime = Date.now();
                console.log();
                console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
            }
        }, 500);

        可以把上面的代码保存为copy.js试验一下

        我们添加了一个递归的setTimeout（或者直接使用setInterval）来做一个旁观者，每500ms观察一次完成进度，
        并把已完成的大小、百分比和复制速度一并写到控制台上，当复制完成时，计算总的耗费时间
