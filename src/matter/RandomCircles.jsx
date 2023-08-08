import { useEffect, useRef } from 'react'
import { Engine, Render, World, Bodies } from 'matter-js'

const RandomCircles = () => {
    const scene = useRef()
    const engine = useRef(Engine.create())

    useEffect(() => {
        // mount
        const cw = document.body.clientWidth
        const ch = document.body.clientHeight

        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
                width: cw,
                height: ch,
                wireframes: false,
                background: 'transparent'
            }
        })

        // boundaries
        World.add(engine.current.world, [
            Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
            Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
            Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
            Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
        ])

        // run the engine
        Engine.run(engine.current)
        Render.run(render)

        // unmount
        return (world, keepStatic) => {
            // destroy RandomCircles
            Render.stop(render)
            World.clear(engine.current.world, keepStatic)
            Engine.clear(engine.current)
            render.canvas.remove()
            render.canvas = null
            render.context = null
            render.textures = {}
        }
    }, [])

    const isPressed = useRef(false)

    const handleDown = () => {
        isPressed.current = true
    }

    const handleUp = () => {
        isPressed.current = false
    }

    const handleAddCircle = e => {
        if (isPressed.current) {
            const ball = Bodies.circle(
                e.clientX,
                e.clientY,
                10 + Math.random() * 30,
                {
                    mass: 10,
                    restitution: 0.9,
                    friction: 0.005,
                    render: {
                        fillStyle: randomIntFromInterval
                    }
                })
            World.add(engine.current.world, [ball])
        }
    }
    const randomIntFromInterval = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    return (
        <div
            onMouseDown={handleDown}
            onMouseUp={handleUp}
            onMouseMove={handleAddCircle}
            ref={scene}
            style={{ width: '100%', height: '100%' }}
        />
    )
}

export default RandomCircles