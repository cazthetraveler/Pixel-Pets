const delPetBtn = document.querySelector("#delete-pet");
const petDeletion = document.querySelector(".pet-deletion");
const closeBtnDelete = document.querySelector(".close-modal-button");

delPetBtn.addEventListener("click", function () {
  petDeletion.style.display = "block";
});

closeBtnDelete.addEventListener("click", function () {
  petDeletion.style.display = "none";
});

const delPetForm = async (event) => {
  event.preventDefault();

  const id = document.querySelector("#sel-pet-del").value;
  console.log(id);

  if (id) {
    const response = await fetch("/api/pets", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      const errorData = await response.json();
      alert(`Failed to delete pet! ${JSON.stringify(errorData)}`);
    }
  }
};

document
  .querySelector("#delete-pet-form")
  .addEventListener("submit", delPetForm);
