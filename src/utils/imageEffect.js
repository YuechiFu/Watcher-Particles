class Color {
    constructor(r = 0, g = 0, b = 0, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    clone() {
        return new this.constructor(this.x, this.y, this.z);
    }
}

function createRandomGradientSVGText(text, fontSize, numColors) {
    // 生成指定数量的随机颜色
    const randomColors = [];
    for (let i = 0; i < numColors; i++) {
        randomColors.push(`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`);
    }

    // 创建渐变的stop元素
    const gradientStops = randomColors.map((color, index) => {
        const offset = (index / (numColors - 1)) * 100;
        return `<stop offset="${offset}%" style="stop-color:${color};stop-opacity:1" />`;
    }).join('');

    // 文本换行处理
    const maxChars = 20;
    const textParts = [];
    for (let i = 0; i < text.length; i += maxChars) {
        textParts.push(text.substring(i, i + maxChars));
    }
    if (typeof fontSize === 'string') { fontSize = parseFloat(fontSize) }
    // 根据fontSize和内容长度调整SVG的宽高
    const lineHeight = fontSize * 1.5; // 约定行高为字体大小的1.2倍
    const svgWidth = fontSize * textParts.reduce((max, part) => Math.max(max, part.length), 0) * 0.6; // 假设每个字符的平均宽度为字体大小的0.6倍
    const svgHeight = lineHeight * textParts.length;

    console.log(svgWidth, svgHeight, textParts)

    // 创建SVG文本
    const svgText = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${gradientStops}
        </linearGradient>
      </defs>
      ${textParts.map((part, index) =>
        `<text x="50%" y="${lineHeight / 2 + index * lineHeight}" font-family="Arial" font-size="${fontSize}px" fill="url(#gradient)" text-anchor="middle" dominant-baseline="central">
          ${part}
        </text>`
    ).join('')}
    </svg>`;
    console.log(svgText)
    return svgToBase64(svgText)
    return {
        svg: svgToBase64(svgText),
        width: svgWidth
    }
}


function svgToBase64(svgText) {
    // 对非ASCII字符进行编码
    var encodedSvgText = unescape(encodeURIComponent(svgText));
    var base64Data = btoa(encodedSvgText);
    return 'data:image/svg+xml;base64,' + base64Data;
}

function useRandom(from, to) {
    return Math.random() * (to - from) + from;
}

// 创建一个 canvas
class CanvasSystem {
    constructor() {
        this.canvas = undefined
        this.context = undefined
    }
    /**
     * @description: 生成一个Canvas
     * @param {string} el
     * @return {*}
     */
    createCanvas(el) {
        let $container = document.querySelector(el);
        if (!$container) { throw new Error('Can not find element' + el); return; }
        this.canvas = document.createElement('canvas');
        this.canvas.width = $container.offsetWidth;
        this.canvas.height = $container.offsetHeight;
        this.canvas.style.maxWidth = '100%'
        this.canvas.style.maxHeight = '100%'
        this.canvas.style.display = 'block';
        $container.innerHTML = ''
        $container.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        return this;
    }

    /**
     * @description: 获取canvas 中点位置
     * @return {*}
     */
    getCenter() {
        return new Vector2(this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2);
    }

    /**
     * @description: 添加文字
     * @param {string} text 
     * @param {*} x 自定义x坐标
     * @param {*} y 自定义y坐标
     * @return {*}
     */



    drawText(text, size, color) {
        const src = createRandomGradientSVGText(text, size, 3)
        this.drawImage(src, 1000)
    }

    /**
     * @description: 重计算图片的宽高 保证在canvas尺寸内
     * @param {ImageData} image 
     * @param {number} cstW
     * @return {*}
     */
    useRecalcSize(image, cstW) {
        let imgScale = image.height / image.width;
        let canvasScale = this.canvas.offsetHeight / this.canvas.offsetWidth;
        if (cstW > this.canvas.offsetWidth) { cstW = this.canvas.offsetWidth }
        let cstH = cstW * imgScale;
        if (cstH > this.canvas.offsetHeight) { cstH = this.canvas.offsetHeight }
        if (imgScale > canvasScale) { cstW = cstH / imgScale }
        return {
            w: cstW, h: cstH
        };
    }

    /**
     * @description: 画一张图片
     * @param {string} src 图片地址
     * @param {number} cstW 自定义图片的宽度 
     */
    drawImage(src, cstW, pos = {}) {
        return new Promise((resolve, reject) => {
            let ctx = this.context;
            let center = this.getCenter();
            let image = new Image();
            image.onload = function () {
                if (!cstW) { cstW = image.width }
                // Recalculate Image Size 
                let { w, h } = this.useRecalcSize(image, cstW);
                pos.x = pos.x || center.x - w / 2;
                pos.y = pos.y || center.y - h / 2;
                ctx.drawImage(image, 0, 0, image.width, image.height, pos.x, pos.y, w, h);
                resolve()
            }.bind(this)

            image.onerror = () => {
                throw new Error('Failed to load image' + src);
                return reject(new Error('Failed to load image' + src));
            }
            image.src = src;
        })
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * @description: 获取每个像素点的信息
     * @param {Number} space
     * @return {*}
     */
    getPixels(space = 1) {
        let pixels = [];
        let imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        for (let x = 0; x < imageData.width; x += space) {
            for (let y = 0; y < imageData.height; y += space) {
                let i = (y * imageData.width + x) * 4;
                if (imageData.data[i + 3] > 128) {
                    pixels.push({
                        x,
                        y,
                        color: new Color(
                            imageData.data[i],
                            imageData.data[i + 1],
                            imageData.data[i + 2],
                            imageData.data[i + 3]
                        )
                    })
                }
            }
        }
        return pixels;
    }

    /**
     * @description:
     * @param {string} el
     */
    init(el) {
        if (!el) { throw new Error(el); return };
        this.createCanvas(el);
        return this;
    }
}

class AnimateContent {
    constructor(options) {
        this.radius = options.radius || 1;
        this.orPos = options.position || new Vector3();
        this.position = options.position || new Vector3();
        this.targetPos = options.targetPos || new Vector3();
        this.color = options.color || new Color();
        this._flag = true;
        this._timer = 0;
    }
    animate(cb) {
        if (this._flag) {
            this.position.x += (this.targetPos.x - this.position.x) * 0.2;
            this.position.y += (this.targetPos.y - this.position.y) * 0.2;
            this.position.z += (this.targetPos.z - this.position.z) * 0.2;
            if (
                Math.abs(this.targetPos.x - this.position.x) < 0.2 &&
                Math.abs(this.targetPos.y - this.position.y) < 0.2 &&
                Math.abs(this.targetPos.z - this.position.z) < 0.2
            ) {
                /* if (this._timer > 200) this._flag = false;
                this._timer++; */
                this._flag = false
            }
            return 
        }
        return cb()

    }
    draw(ctx, center) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},1)`;
        ctx.fillRect(center.x + (this.position.x - center.x) , center.y + (this.position.y - center.y), this.radius , this.radius);
        ctx.restore();
    }
}



/**
 * @description: 
 * @param {*} radius 颗粒宽度
 * @param {*} space 密度间隙
 * @return {*}
 */
export default function (el, image, radius = 1, space = 5) {
    if (!image) return
    let cs = new CanvasSystem();
    let playId = null
    cs.init(el);
    let dnum = 0;
    let center = cs.getCenter();
    let balls = [], isPlay = true;

    async function initFrame(image) {
        playId && cancelAnimationFrame(playId)
        if (!image) return
        /* 1.还原和初始化 */
        balls = [];
        dnum = 0;
        cs.clear();

        /* 2.构建原图 */
        await cs.drawImage(image);
        let pixels = cs.getPixels(space);
        cs.clear();

        // cs.context.save();
        /* 3.获取每个点的最终配置 */
        for (let i = 0; i < pixels.length; i++) {
            let ball = new AnimateContent({
                radius,
                position: new Vector3(
                    useRandom(0, cs.canvas.width),
                    useRandom(0, cs.canvas.height),
                    useRandom(-250, 250)
                ),
                targetPos: new Vector3(pixels[i].x, pixels[i].y, 0),
                color: new Color(
                    // parseInt(Math.random() * 100 + 130),
                    // parseInt(Math.random() * 100 + 130),
                    // parseInt(Math.random() * 100 + 130),
                    pixels[i].color.r,
                    pixels[i].color.g,
                    pixels[i].color.b,
                    pixels[i].color.a
                )
            })
            balls.push(ball)
        }
    }

    function render(ctx) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, cs.canvas.width, cs.canvas.height);
        ctx.restore();
        for (let i = 0; i < balls.length; i++) {
            balls[i].animate(() => {
                dnum++;
                if (dnum >= balls.length) {
                    initFrame();
                }
            })
            if (balls[i] === undefined) { return };
            balls[i].draw(ctx, center);
        }
    }



    async function play(action) {
        _update()
        function _update() {
            playId = requestAnimationFrame(_update)
            action(cs.context)
        }
    }
    
    initFrame(image)
    play(render)
    return playId
}


