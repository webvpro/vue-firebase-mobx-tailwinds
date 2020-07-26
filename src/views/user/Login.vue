<template>
    <div class="bg-gray-300 min-h-screen w-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
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
                    class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-800 focus:outline-none my-1"
                >Login</button>

            </form>

            <div class="text-gray-800 mt-6">
                Need an account? 
                <a class="no-underline border-b border-blue text-blue hover:underline" href="../register">
                    Sign Up Here
                </a>.
            </div>
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