export const loading = () => {
	const loading = document.getElementById("loading");
	if (loading) loading.style = "";
};

export const doneLoading = () => {
	const loading = document.getElementById("loading");
	if (loading) loading.style = "display: none;";
};
