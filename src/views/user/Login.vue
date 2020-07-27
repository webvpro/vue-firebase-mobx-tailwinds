<template>
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center">
            <form ref="form" @submit.prevent="submit"
                class="card"
            >
                <h1 class="mb-8 text-3xl text-center">Sign in</h1>
                <ul role="alert" v-if="errors.length"  class="border border-red-400 rounded bg-red-100 px-4 py-3 text-red-700 list-disc mb-4">
                    <li v-for="error in errors" :key="error" class="m-1 ml-2">
                        <p>{{error}}</p>
                    </li>
                </ul>
                <input 
                    type="email"
                    class="block border border-gray-300 w-full p-3 rounded mb-4"
                    name="email"
                    v-model="email"
                    placeholder="Email"
                    required />

                <input 
                    type="password"
                    class="block border border-gray-300 w-full p-3 rounded mb-4"
                    name="password"
                    v-model="password"
                    placeholder="Password"
                    required />
                
                <button
                    type="submit"
                    class="btn btn--action w-full focus:outline-none"
                >Login</button>

            </form>

            <div class="text-gray-800 mt-6">
                <router-link to="/register" tag="button" class="btn btn--primary w-64">Sign up</router-link>
            </div>
        </div>
</template>

<script>
    import { Auth } from '../../firebase/auth';
   

    export default {
    name: 'login',
    data() {
        return {
        email: '',
        password: '',
        confirm_password: '',
        errors: [],
        };
    },
    methods: {
        submit(event) {
            event.target.classList.add('was-validated');
             Auth.signInWithEmailAndPassword(this.email, this.password)
          .then(() => this.$router.push('/about'))
          .catch(err => this.errors.push(err.message));
        },
        handleSignIn() {
            console.log("do task before submit");
            if (this.$refs.form.checkValidity()) {
                this.submit();
            } else {
                this.$refs.form.reportValidity();
            }
        }
    },
    };
</script>