export const onInitialize = async ({ state, effects }) => {
    state.user = await effects.auth.initialize()
}