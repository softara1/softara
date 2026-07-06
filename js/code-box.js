/**
 * Download Box Enhancer + Code Box Copy
 * RTL Support, No External APIs
 * يعزز صناديق التحميل ويحتوي دالة نسخ الأكواد.
 */

// ========== تضمين مكتبة QR Code Generator مدمجة (بدون اعتماديات) ==========
var QRCode;!function(){function a(a){this.mode=c.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],d=0,e=this.data.length;e>d;d++){var f=this.data.charCodeAt(d);f>65536?(b[0]=240|(1835008&f)>>>18,b[1]=128|(258048&f)>>>12,b[2]=128|(4032&f)>>>6,b[3]=128|63&f):f>2048?(b[0]=224|(61440&f)>>>12,b[1]=128|(4032&f)>>>6,b[2]=128|63&f):f>128?(b[0]=192|(1984&f)>>>6,b[1]=128|63&f):b[0]=f,this.parsedData=this.parsedData.concat(b)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a,this.dataCount=b}function k(){this.buffer=[],this.length=0}function m(){return"undefined"!=typeof CanvasRenderingContext2D}function n(){var a=!1,b=navigator.userAgent;return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}function r(a,b){for(var c=1,e=s(a),f=0,g=l.length;g>=f;f++){var h=0;switch(b){case d.L:h=l[f][0];break;case d.M:h=l[f][1];break;case d.Q:h=l[f][2];break;case d.H:h=l[f][3]}if(h>=e)break;c++}if(c>l.length)throw new Error("Too long data");return c}function s(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=q.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=q.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var f=-2;2>=f;f++)for(var g=-2;2>=g;g++)this.modules[d+f][e+g]=-2==f||2==f||-2==g||2==g||0==f&&0==g?!0:!1}},setupTypeNumber:function(a){for(var b=q.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(b>>c&1);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(b>>c&1);this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=q.getBCHTypeInfo(c),e=0;15>e;e++){var f=!a&&1==(d>>e&1);6>e?this.modules[e][8]=f:8>e?this.modules[e+1][8]=f:this.modules[this.moduleCount-15+e][8]=f}for(var e=0;15>e;e++){var f=!a&&1==(d>>e&1);8>e?this.modules[8][this.moduleCount-e-1]=f:9>e?this.modules[8][15-e-1+1]=f:this.modules[8][15-e-1]=f}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,f=0,g=this.moduleCount-1;g>0;g-=2)for(6==g&&g--;;){for(var h=0;2>h;h++)if(null==this.modules[d][g-h]){var i=!1;f<a.length&&(i=1==(a[f]>>>e&1)),q.getMask(b,d,g-h)&&(i=!i),this.modules[d][g-h]=i,e--,-1==e&&(f++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},b.PAD0=236,b.PAD1=17,b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),f=new k,g=0;g<d.length;g++){var h=d[g];f.put(h.mode,4),f.put(h.getLength(),q.getLengthInBits(h.mode,a)),h.write(f)}for(var i=0,g=0;g<e.length;g++)i+=e[g].dataCount;if(f.getLengthInBits()>8*i)throw new Error("code length overflow. ("+f.getLengthInBits()+">"+8*i+")");for(f.getLengthInBits()+4<=8*i&&f.put(0,4);0!=f.getLengthInBits()%8;)f.putBit(!1);for(;;){if(f.getLengthInBits()>=8*i)break;if(f.put(b.PAD0,8),f.getLengthInBits()>=8*i)break;f.put(b.PAD1,8)}return b.createBytes(f,e)},b.createBytes=function(a,b){for(var c=0,d=0,e=0,f=new Array(b.length),g=new Array(b.length),h=0;h<b.length;h++){var i=b[h].dataCount,j=b[h].totalCount-i;d=Math.max(d,i),e=Math.max(e,j),f[h]=new Array(i);for(var k=0;k<f[h].length;k++)f[h][k]=255&a.buffer[k+c];c+=i;var l=q.getErrorCorrectPolynomial(j),m=new i(f[h],l.getLength()-1),n=m.mod(l);g[h]=new Array(l.getLength()-1);for(var k=0;k<g[h].length;k++){var o=k+n.getLength()-g[h].length;g[h][k]=o>=0?n.get(o):0}}for(var p=0,k=0;k<b.length;k++)p+=b[k].totalCount;for(var r=new Array(p),s=0,k=0;d>k;k++)for(var h=0;h<b.length;h++)k<f[h].length&&(r[s++]=f[h][k]);for(var k=0;e>k;k++)for(var h=0;h<b.length;h++)k<g[h].length&&(r[s++]=g[h][k]);return r};for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var b=a<<10;f.getBCHDigit(b)-f.getBCHDigit(f.G15)>=0;)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;f.getBCHDigit(b)-f.getBCHDigit(f.G18)>=0;)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;a>c;c++)b=b.multiply(new i([1,l.gexp(c)],0));return b},getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,d=0;b>d;d++)for(var e=0;b>e;e++)a.isDark(d,e)&&k++;var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},g={glog:function(a){if(1>a)throw new Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(var h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];for(var h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);return new i(c,0).mod(a)}},j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;d>f;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;g>k;k++)e.push(new j(h,i));return e},j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return void 0}},k.prototype={get:function(a){var b=Math.floor(a/8);return 1==(this.buffer[b]>>>7-a%8&1)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(a>>>b-c-1&1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};var l=[[]];"undefined"!=typeof window&&(QRCode=function(a,b){if(this.element=a,this.darkColor=b.dark||"#000",this.lightColor=b.light||"#fff",this.typeNumber=b.typeNumber||4,this.errorCorrectLevel=b.correctLevel||d.H,this.text=b.text||"",this.size=b.size||200,""==this.text)throw new Error("QR Code text is empty");this.draw()},QRCode.prototype.draw=function(){var a=new b(this.typeNumber,this.errorCorrectLevel);a.addData(this.text),a.make();var c=this.element,d=document.createElement("canvas");d.width=this.size,d.height=this.size;var e=d.getContext("2d"),f=this.size/a.getModuleCount(),g=0;for(var h in a.modules){var i=g*f;for(var j=0;j<a.modules[h].length;j++){var k=j*f;e.fillStyle=a.modules[h][j]?this.darkColor:this.lightColor,e.fillRect(k,i,f,f)}}c.appendChild(d)})}();

// ========== محسّن صندوق التحميل ==========
(function() {
  'use strict';

  const iconMap = {
    pdf: 'fa-file-pdf', doc: 'fa-file-word', docx: 'fa-file-word',
    xls: 'fa-file-excel', xlsx: 'fa-file-excel', ppt: 'fa-file-powerpoint', pptx: 'fa-file-powerpoint',
    jpg: 'fa-file-image', jpeg: 'fa-file-image', png: 'fa-file-image', gif: 'fa-file-image', svg: 'fa-file-image',
    zip: 'fa-file-archive', rar: 'fa-file-archive', '7z': 'fa-file-archive',
    mp3: 'fa-file-audio', wav: 'fa-file-audio', flac: 'fa-file-audio',
    mp4: 'fa-file-video', mkv: 'fa-file-video', avi: 'fa-file-video', mov: 'fa-file-video',
    txt: 'fa-file-alt', csv: 'fa-file-csv',
    html: 'fa-file-code', css: 'fa-file-code', js: 'fa-file-code', json: 'fa-file-code',
    m3u: 'fa-file-video', default: 'fa-file'
  };

  function formatSize(bytes) {
    if (!bytes) return '';
    if (typeof bytes === 'string' && bytes.match(/[KMGT]?B/i)) return bytes;
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return bytes;
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0, size = num;
    while (size >= 1024 && i < units.length-1) { size /= 1024; i++; }
    return size.toFixed(2).replace(/\.00$/, '') + ' ' + units[i];
  }

  function getLocalCount(href) {
    const key = 'dlCount_' + btoa(href).replace(/=/g, '');
    return parseInt(localStorage.getItem(key) || '0', 10);
  }
  function incrementLocalCount(href) {
    const key = 'dlCount_' + btoa(href).replace(/=/g, '');
    const count = getLocalCount(href) + 1;
    localStorage.setItem(key, count);
    return count;
  }

  function createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    element.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  }

  function enhanceBox(box) {
    const href = box.getAttribute('data-href') || '';
    const ext = box.getAttribute('data-ext') || (box.querySelector('.fT')?.getAttribute('data-text')) || '';
    const filename = box.getAttribute('data-filename') || box.querySelector('.fN span:first-child')?.textContent || '';
    const rawSize = box.getAttribute('data-size') || box.querySelector('.fS')?.textContent || '';
    const password = box.getAttribute('data-password') || '';
    const mirrorsData = box.getAttribute('data-mirrors') || '';
    const enableQR = box.getAttribute('data-qr') === 'true';

    // أيقونة الملف
    const iconSpan = box.querySelector('.fT');
    if (iconSpan) {
      const extension = ext || (filename.split('.').pop()?.toLowerCase()) || 'default';
      const iconClass = iconMap[extension] || iconMap.default;
      iconSpan.innerHTML = `<i class="fas ${iconClass}"></i>`;
    }

    const nameSpan = box.querySelector('.fN span:first-child');
    if (nameSpan && filename) nameSpan.textContent = filename;
    const sizeSpan = box.querySelector('.fS');
    if (sizeSpan) sizeSpan.textContent = formatSize(rawSize);

    let btnGroup = box.querySelector('.btnGroup');
    if (!btnGroup) {
      btnGroup = document.createElement('div');
      btnGroup.className = 'btnGroup';
      const existingBtn = box.querySelector('.dl-btn');
      if (existingBtn) existingBtn.parentNode.insertBefore(btnGroup, existingBtn.nextSibling);
      else box.appendChild(btnGroup);
    } else {
      btnGroup.innerHTML = '';
    }

    // زر التحميل
    const dlBtn = document.createElement('button');
    dlBtn.className = 'dl-btn';
    dlBtn.setAttribute('aria-label', 'تحميل');
    dlBtn.innerHTML = '<i class="fas fa-download"></i> تحميل';
    if (href) dlBtn.setAttribute('data-href', href);

    const countSpan = document.createElement('span');
    countSpan.className = 'dl-count';
    const initialCount = getLocalCount(href);
    countSpan.textContent = initialCount > 0 ? ` (${initialCount})` : '';
    dlBtn.appendChild(countSpan);

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    dlBtn.appendChild(progressBar);

    // نسخ الرابط
    const copyBtn = document.createElement('button');
    copyBtn.className = 'icon-btn';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    const tooltip = document.createElement('span');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = 'تم النسخ';
    copyBtn.appendChild(tooltip);

    let qrBtn;
    if (enableQR && href) {
      qrBtn = document.createElement('button');
      qrBtn.className = 'icon-btn';
      qrBtn.innerHTML = '<i class="fas fa-qrcode"></i>';
    }

    let passwordRevealEl;
    if (password) {
      passwordRevealEl = document.createElement('div');
      passwordRevealEl.className = 'password-reveal';
      passwordRevealEl.innerHTML = `<i class="fas fa-lock"></i> <span class="pw-hidden">••••••••</span> <i class="fas fa-eye toggle-pw" style="cursor:pointer; margin-right:4px;"></i>`;
    }

    let mirrorsContainer;
    if (mirrorsData) {
      try {
        const mirrors = JSON.parse(mirrorsData);
        if (mirrors.length) {
          mirrorsContainer = document.createElement('div');
          mirrorsContainer.className = 'mirror-btns';
          mirrors.forEach(m => {
            const a = document.createElement('a');
            a.className = 'mirror-link';
            a.href = m.url;
            a.textContent = m.label;
            a.target = '_blank';
            a.rel = 'noopener';
            mirrorsContainer.appendChild(a);
          });
        }
      } catch(e) {}
    }

    if (qrBtn) btnGroup.appendChild(qrBtn);
    btnGroup.appendChild(copyBtn);
    btnGroup.appendChild(dlBtn);

    if (passwordRevealEl) box.appendChild(passwordRevealEl);
    if (mirrorsContainer) box.appendChild(mirrorsContainer);

    // أحداث الأزرار
    box.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', function(e) { createRipple(e, this); });
    });

    dlBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (dlBtn.disabled) return;
      const targetHref = dlBtn.getAttribute('data-href');
      if (!targetHref) return;
      dlBtn.disabled = true;
      let width = 0;
      progressBar.style.width = '0%';
      const interval = setInterval(() => {
        width += 5;
        progressBar.style.width = width + '%';
        if (width >= 100) {
          clearInterval(interval);
          const a = document.createElement('a');
          a.href = targetHref;
          a.download = '';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => {
            dlBtn.disabled = false;
            progressBar.style.width = '0%';
          }, 1500);
        }
      }, 60);
      const newCount = incrementLocalCount(targetHref);
      countSpan.textContent = ` (${newCount})`;
    });

    copyBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const copyHref = href || dlBtn.getAttribute('data-href');
      if (!copyHref) return;
      navigator.clipboard.writeText(copyHref).then(() => {
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 1500);
      }).catch(() => {
        const temp = document.createElement('textarea');
        temp.value = copyHref;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 1500);
      });
    });

    if (qrBtn && href) {
      qrBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        let modal = document.getElementById('qrModal');
        if (!modal) {
          modal = document.createElement('div');
          modal.id = 'qrModal';
          modal.className = 'qr-modal';
          modal.innerHTML = `<div class="qr-modal-content"><h3>امسح الرمز للتحميل</h3><div id="qrContainer"></div><button class="close-btn">إغلاق</button></div>`;
          document.body.appendChild(modal);
          modal.querySelector('.close-btn').addEventListener('click', () => modal.classList.remove('show'));
          modal.addEventListener('click', function(e) { if (e.target === modal) modal.classList.remove('show'); });
        }
        modal.classList.add('show');
        document.getElementById('qrContainer').innerHTML = '';
        new QRCode(document.getElementById('qrContainer'), {
          text: href,
          size: 180,
          dark: '#000',
          light: '#fff',
          correctLevel: QRCode.CorrectLevel.H
        });
      });
    }

    if (passwordRevealEl) {
      const toggle = passwordRevealEl.querySelector('.toggle-pw');
      const pwSpan = passwordRevealEl.querySelector('.pw-hidden');
      if (toggle && pwSpan) {
        toggle.addEventListener('click', () => {
          if (pwSpan.textContent === password) {
            pwSpan.textContent = '••••••••';
            toggle.classList.replace('fa-eye-slash', 'fa-eye');
          } else {
            pwSpan.textContent = password;
            toggle.classList.replace('fa-eye', 'fa-eye-slash');
          }
        });
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dlBox').forEach(enhanceBox);
  });
})();

// ========== دالة نسخ الأكواد (خارج IIFE لتكون عامة) ==========
function copyCodeBox(button) {
  const container = button.closest('.code-box-container');
  const textarea = container.querySelector('.code-box-textarea');
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  try {
    document.execCommand('copy');
    const originalHTML = button.innerHTML;
    button.innerHTML = '✅ تم النسخ';
    button.classList.add('copied');
    setTimeout(function() {
      button.innerHTML = originalHTML;
      button.classList.remove('copied');
    }, 2000);
  } catch (err) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textarea.value).then(function() {
        button.innerHTML = '✅ تم النسخ';
        button.classList.add('copied');
        setTimeout(function() {
          button.innerHTML = '📋 نسخ';
          button.classList.remove('copied');
        }, 2000);
      }).catch(function() {
        alert('تعذر النسخ، حاول يدوياً.');
      });
    } else {
      alert('النسخ غير مدعوم. الرجاء تحديد النص ونسخه يدوياً.');
    }
  }
}
