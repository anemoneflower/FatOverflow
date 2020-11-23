<template>
    <div class="btn-group">
        <li
                @click="toggleMenu()"
                class="dropdown-toggle"
                v-if="selectedOption !== ''"
        >
            {{ selectedOption }}
            <span class="caret"></span>
        </li>

        <li
                @click="toggleMenu()"
                class="dropdown-toggle dropdown-toggle-placeholder"
                v-if="selectedOption === ''"
        >
            {{ placeholderText }}
            <span class="caret"></span>
        </li>

        <ul class="dropdown-menu" v-if="showMenu">
            <li v-for="(option, idx) in itemArray" :key="idx">
                <a href="javascript:void(0)" @click="updateOption(option)">
                    {{ option }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        data() {
            return {
                selectedOption: '',
                showMenu:
                    false,
            }
        },
        props: {
            closeOnOutsideClick: {
                type: [Boolean],
                default: true
            },
            itemArray: Array,
            index: Number,
            placeholderText: String,
        },
        mounted() {
            console.log(this.itemArray);

            if (this.closeOnOutsideClick) {
                document.addEventListener("click", this.clickHandler);
            }
        },
        beforeDestroy() {
            document.removeEventListener("click", this.clickHandler);
        },
        methods: {
            updateOption(option) {
                console.log(option);
                this.selectedOption = option;
                this.showMenu = false;
                this.$emit("updateOption", {index:this.index, payload:this.selectedOption});
            },

            toggleMenu() {
                this.showMenu = !this.showMenu;
                console.log(this.itemArray)
            },

            clickHandler(event) {
                const {target} = event;
                const {$el} = this;

                if (!$el.contains(target)) {
                    this.showMenu = false;
                }
            }
        }
    }
</script>

<style scoped>

    .btn-group {
        min-width: 400px;
        height: 40px;
        position: relative;
        margin: 10px 1px;
        display: inline-block;
        vertical-align: middle;
        max-height: 40px;
    }
    .btn-group a:hover {
        text-decoration: none;
    }

    .dropdown-toggle {
        color: #636b6f;
        min-width: 400px;
        padding: 10px 20px 10px 10px;
        text-transform: none;
        font-weight: 300;
        margin-bottom: 7px;
        border: 0;
        background-image: linear-gradient(#009688, #009688),
        linear-gradient(#d2d2d2, #d2d2d2);
        background-size: 0 2px, 100% 1px;
        background-repeat: no-repeat;
        background-position: center bottom, center calc(100% - 1px);
        background-color: transparent;
        transition: background 0s ease-out;
        float: none;
        box-shadow: none;
        border-radius: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .dropdown-toggle:hover {
        background: #e1e1e1;
        cursor: pointer;
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        float: left;
        min-width: 435px;
        padding: 5px 0;
        margin: 11px 0 0;
        list-style: none;
        font-size: 14px;
        text-align: left;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        background-clip: padding-box;
        max-height: 200px;
        min-height: 30px;
        overflow-y:scroll;
    }
    .dropdown-menu::-webkit-scrollbar {
        width: 12px;
    }
    .dropdown-menu::-webkit-scrollbar-thumb {
        background-color: none;
        border-radius: 6px;
    }
    .dropdown-menu:hover::-webkit-scrollbar-thumb {
        background: #dadada;
    }
    .dropdown-menu::-webkit-scrollbar-track {
        background-color: white;
    }

    .dropdown-menu > li > a {
        padding: 10px 30px;
        display: block;
        clear: both;
        font-weight: normal;
        line-height: 1.6;
        color: #333333;
        white-space: nowrap;
        text-decoration: none;
    }
    .dropdown-menu > li > a:hover {
        background: #efefef;
        color: #409fcb;
    }

    .dropdown-menu > li {
        overflow: hidden;
        width: 100%;
        position: relative;
        margin: 0;
    }

    .caret {
        width: 0;
        position: absolute;
        top: 19px;
        height: 0;
        margin-left: -24px;
        vertical-align: middle;
        border-top: 4px dashed;
        border-top: 4px solid \9;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        right: 10px;
    }

    li {
        list-style: none;
    }
</style>