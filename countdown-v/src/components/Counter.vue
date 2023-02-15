<template>
    <div v-if="loaded">
        <section class="text-3xl flex jutify-center">
            <h5 v-if="!expired">Buy Now</h5>
            <h5 v-else>Timer Is Done</h5>
        </section>
        <section class="text-6xl flex jutify-center content-center">
            <div class="days mr-2 relative text-center">
                {{displayDays}}
                <div class="label text-sm">days</div>
            </div>
            <span class="leading-snug">:</span>
            <div class="hours mx-2 relative text-center">
                {{displayHours}}
                <div class="label text-sm">hours</div>
            </div>
            <span class="leading-snug">:</span>
            <div class="minutes mx-2 relative text-center">
                {{displayMinutes}}
                <div class="label text-sm">minutes</div>
            </div>
            <span class="leading-snug">:</span>
            <div class="minutes ml-2 relative text-center">
                {{displaySeconds}}
                <div class="label text-sm">seconds</div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        props: ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'],
        data: () => ({
            displayDays: 0,
            displayHours: 0,
            displayMinutes: 0,
            displaySeconds: 0,
            loaded: false,
            expired: false
        }),
        computed: {
            _seconds: () => 1000,
            _minutes() {
                return this._seconds * 60
            },
            _hours() {
                return this._minutes * 60
            },
            _days() {
                return this._hours * 60
            },
            end() {
                return new Date(
                    this.year,
                    this.month,
                    this.date,
                    this.hour,
                    this.minute,
                    this.second,
                    this.millisecond,
                )
            }
        },
        mounted() {
            this.showRemaining()
        },
        methods: {
            formatNum: num => (num < 10 ? "0" + num: num),
            showRemaining() {
                const timer = setInterval(() => {
                    const now = new Date()
                    // const end = new Date(2023, 4, 22, 10, 10, 10, 10)
                    const distance = this.end.getTime() - now.getTime()

                    if(distance < 0) {
                        clearInterval(timer)
                        this.expired = true
                        this.loaded = true
                        return
                    }
                    const days = Math.floor(distance / this._days)
                    const hours = Math.floor((distance % this._days) / this._hours)
                    const minutes = Math.floor((distance % this._hours) / this._minutes)
                    const seconds = Math.floor((distance % this._minutes) / this._seconds)
                    this.displayMinutes = this.formatNum(minutes)
                    this.displaySeconds = this.formatNum(seconds)
                    this.displayHours = this.formatNum(hours)
                    this.displayDays = this.formatNum(days)
                    this.loaded = true
                }, 1000)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>