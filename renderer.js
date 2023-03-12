window.api.receive("fromMain", (data) => {
    console.log(`Received ${JSON.stringify(data)} from main process`);
    document.getElementById("content").innerHTML = data.contents;
});

document.getElementById("loadContent").onclick = () => {
    const filename = document.getElementById("filename").value;
    window.api.send("toMain", {filename: filename});
}
