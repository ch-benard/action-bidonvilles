import { list } from '#helpers/api/operator';
import { VueGoodTable as Table } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
import NavBar from '#app/layouts/navbar/navbar.vue';

export default {
    components: {
        NavBar,
        Table,
    },

    data() {
        return {
            /**
             * List of operators
             *
             * @type {Array.<Operator>}
             */
            operators: [],

            /**
             * The error's user message
             *
             * Obivously, null if there is no error
             *
             * @type {string|null}
             */
            error: null,

            /**
             * The current state of the page
             *
             * One out of: 'loading', 'error', or 'loaded'
             *
             * @type {string|null}
             */
            state: null,
        };
    },

    computed: {
        tableProperties() {
            return {
                columns: [
                    {
                        label: 'Nom de l\'opérateur',
                        field: 'name',
                    },
                ],
                rows: this.operators,
                'sort-options': {
                    enabled: true,
                },
            };
        },
    },

    created() {
        this.load();
    },

    methods: {
        /**
         * Tries fetching the data from the API
         *
         * Please note that this cannot be done if the data has already been loaded
         * before.
         */
        load() {
            // loading data is forbidden if the component is already loading or loaded
            if ([null, 'error'].indexOf(this.state) === -1) {
                return;
            }

            this.state = 'loading';
            this.error = null;

            list()
                .then((operators) => {
                    this.operators = operators;
                    this.state = 'loaded';
                })
                .catch(({ user_message: error }) => {
                    this.error = error;
                    this.state = 'error';
                });
        },

        /**
         * Alias to load(), for better readibility in the view
         *
         * @see load()
         */
        retryLoading() {
            this.load();
        },
    },
};