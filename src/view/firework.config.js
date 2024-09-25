export const configs = {
    name: "Fireworks Mask",
    fullScreen: {
        enable: true
    },
    background: {
        color: "#000000",
        // image: "url('https://particles.js.org/images/background3.jpg')",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover"
    },
    backgroundMask: {
        enable: true,
        cover: {
            color: "#000"
        }
    },
    emitters: {
        direction: "top",
        life: {
            count: 0,
            duration: 0.1,
            delay: 0.1
        },
        rate: {
            delay: 0.15,
            quantity: 1
        },
        size: {
            width: 100,
            height: 0
        },
        position: {
            y: 100,
            x: 50
        }
    },
    particles: {
        color: {
            value: "#fff"
        },
        number: {
            value: 0
        },
        destroy: {
            bounds: {
                top: 30
            },
            mode: "split",
            split: {
                count: 1,
                factor: {
                    value: 0.333333
                },
                rate: {
                    value: 30
                },
                particles: {
                    stroke: {
                        width: 0
                    },
                    color: {
                        value: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]
                    },
                    number: {
                        value: 0
                    },
                    collisions: {
                        enable: false
                    },
                    destroy: {
                        bounds: {
                            top: 0
                        }
                    },
                    opacity: {
                        value: {
                            min: 0.1,
                            max: 1
                        },
                        animation: {
                            enable: true,
                            speed: 0.7,
                            sync: false,
                            startValue: "max",
                            destroy: "min"
                        }
                    },
                    effect: {
                        type: "trail",
                        options: {
                            trail: {
                                length: {
                                    min: 5,
                                    max: 10
                                }
                            }
                        }
                    },
                    shape: {
                        type: "circle"
                    },
                    size: {
                        value: 2,
                        animation: {
                            enable: false
                        }
                    },
                    life: {
                        count: 1,
                        duration: {
                            value: {
                                min: 1,
                                max: 2
                            }
                        }
                    },
                    move: {
                        enable: true,
                        gravity: {
                            enable: true,
                            acceleration: 9.81,
                            inverse: false
                        },
                        decay: 0.1,
                        speed: {
                            min: 10,
                            max: 25
                        },
                        direction: "outside",
                        outModes: "destroy"
                    }
                }
            }
        },
        life: {
            count: 1
        },
        effect: {
            type: "trail",
            options: {
                trail: {
                    length: {
                        min: 10,
                        max: 30
                    },
                    minWidth: 1,
                    maxWidth: 1
                }
            }
        },
        rotate: {
            path: true
        },
        shape: {
            type: "circle"
        },
        size: {
            value: 1
        },
        move: {
            enable: true,
            gravity: {
                acceleration: 15,
                enable: true,
                inverse: true,
                maxSpeed: 100
            },
            speed: {
                min: 10,
                max: 20
            },
            outModes: {
                default: "destroy",
                top: "none"
            }
        }
    },
    sounds: {
        enable: true,
        events: [
            {
                event: "particleRemoved",
                filter: (args) => args.data.particle.options.move.gravity.inverse,
                audio: [
                    "https://particles.js.org/audio/explosion0.mp3",
                    "https://particles.js.org/audio/explosion1.mp3",
                    "https://particles.js.org/audio/explosion2.mp3"
                ]
            }
        ],
        volume: 50
    }
};

 
function generateGradientColors(startColor, midColor, endColor, steps) {
    function lerpColor(a, b, amount) { 
        var ah = parseInt(a.replace(/#/g, ''), 16),
            ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
            bh = parseInt(b.replace(/#/g, ''), 16),
            br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
            rr = ar + amount * (br - ar),
            rg = ag + amount * (bg - ag),
            rb = ab + amount * (bb - ab);
    
        return '#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1);
    }
    var gradientColors = [];
    for (var i = 0; i < steps; i++) {
        if (i < steps / 2) {
            // Lerp from startColor to midColor
            gradientColors.push(lerpColor(startColor, midColor, (2 * i) / steps));
        } else {
            // Lerp from midColor to endColor
            gradientColors.push(lerpColor(midColor, endColor, (2 * (i - steps / 2)) / steps));
        }
    }
    return gradientColors;
}

export const f1 = {
    name: "Fireworks Mask",
    fullScreen: {
        enable: true
    },
    background: {
        color: "#000000",
        // image: "url('https://particles.js.org/images/background3.jpg')",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover"
    },
    backgroundMask: {
        enable: false,
        cover: {
            color: "#000"
        }
    },
    emitters: {
        direction: "top",
        life: {
            count: 0,
            duration: 0.1,
            delay: 0.1
        },
        rate: {
            delay: 0.15,
            quantity: 1
        },
        size: {
            width: 100,
            height: 0
        },
        position: {
            y: 100,
            x: 50
        }
    },
    particles: {
        color: {
            value: "#fff"
        },
        number: {
            value: 0
        },
        destroy: {
            bounds: {
                top: 30
            },
            mode: "split",
            split: {
                count: 1,
                factor: {
                    value: 0.333333
                },
                rate: {
                    value: 50
                },
                particles: {
                    stroke: {
                        width: 0
                    },
                    color: {
                        value: generateGradientColors('#f8386d', '#40f2b1', '#f68844', 20)
                        // value: [ 
                        //     "#ffffff",
                        //     "#b22234",
                        //     "#b22234",
                        //     "#3c3bfe",
                        //     "#3c3bfe",
                        //     "#3c3bfe"]
                    },
                    number: {
                        value: 0
                    },
                    collisions: {
                        enable: false
                    },
                    destroy: {
                        bounds: {
                            top: 0
                        }
                    },
                    opacity: {
                        value: {
                            min: 0.1,
                            max: 1
                        },
                        animation: {
                            enable: true,
                            speed: 0.7,
                            sync: false,
                            startValue: "max",
                            destroy: "min"
                        }
                    },
                    effect: {
                        type: "trail",
                        options: {
                            trail: {
                                length: {
                                    min: 5,
                                    max: 10
                                }
                            }
                        }
                    },
                    shape: {
                        type: "circle"
                    },
                    size: {
                        value: 2,
                        animation: {
                            enable: false
                        }
                    },
                    life: {
                        count: 1,
                        duration: {
                            value: {
                                min: 1,
                                max: 2
                            }
                        }
                    },
                    move: {
                        enable: true,
                        gravity: {
                            enable: true,
                            acceleration: 9.81,
                            inverse: false
                        },
                        decay: 0.1,
                        speed: {
                            min: 10,
                            max: 25
                        },
                        direction: "outside",
                        outModes: "destroy"
                    }
                }
            }
        },
        life: {
            count: 1
        },
        effect: {
            type: "trail",
            options: {
                trail: {
                    length: {
                        min: 10,
                        max: 30
                    },
                    minWidth: 1,
                    maxWidth: 1
                }
            }
        },
        rotate: {
            path: true
        },
        shape: {
            type: "circle"
        },
        size: {
            value: 1
        },
        move: {
            enable: true,
            gravity: {
                acceleration: 15,
                enable: true,
                inverse: true,
                maxSpeed: 100
            },
            speed: {
                min: 10,
                max: 20
            },
            outModes: {
                default: "destroy",
                top: "none"
            }
        }
    },
    sounds: {
        enable: true,
        events: [
            {
                event: "particleRemoved",
                filter: (args) => args.data.particle.options.move.gravity.inverse,
                audio: [
                    "https://particles.js.org/audio/explosion0.mp3",
                    "https://particles.js.org/audio/explosion1.mp3",
                    "https://particles.js.org/audio/explosion2.mp3"
                ]
            }
        ],
        volume: 50
    }
};





export const getMaskConf = (img) => {
    return {
        smooth: true,
        interactivity: {
            events: {
              /*   onHover: {
                    enable: true,
                    mode: "bubble",
                    parallax: {
                        enable: false,
                        force: 2,
                        smooth: 10
                    }
                } */
            },
            modes: {
              /*   bubble: {
                    distance: 40,
                    duration: 2,
                    opacity: 8,
                    size: 15
                } */
            }
        },
        particles: {
            move: {
                direction: "random",
                distance: 1,
                enable: true,
                outModes: "none",
                speed: 1
            },
            number: {
                value: 5000
            },
            shape: {
                // type: ["circle", "square", "triangle"]
            },
            size: {
                value: {
                    min: 1,
                    max: 1
                }
            }
        },
        canvasMask: {
            enable: true,
            scale: 1,
            pixels: {
                filter: "pixelFilter"
            },
            image: {
                src: img || "https://particles.js.org/images/amongus_cyan.png"
            }
        },
        background: {
            color: "#000000",
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover"
        }
    }
}