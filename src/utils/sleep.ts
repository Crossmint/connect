export async function sleep(waitTime: number) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
}
