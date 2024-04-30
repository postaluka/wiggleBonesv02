import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter
{
    constructor()
    {
        // we inherit the constructor of the inherited class
        super()

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0 // how much time was spent since the start of the experience
        this.delta = 16 // how much time was spent since the previous frame

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })

    }

    tick()
    {
        // console.log('tick');

        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }
}