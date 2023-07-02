function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    let values = document.getElementById('values');
    const inpform = document.getElementById('inp-form');

    if (Client.checkForName(formText)) {
    //   console.log("::: Form Submitted :::");
      inpform.classList.add('loading');
      values.innerHTML = `<p>Analysing Please wait...</p><br><p>Powered by Meaning Cloud Api</p>`;
      Client.postData("/analyse", { url: formText }).then((res) => {
        inpform.classList.remove('loading');
        if (res.status.code === "0") {
            values.innerHTML =
              `<p>${res.sentence_list[0].text}</p>
                  <table class="res-table">
                      <tr>
                          <th>Property</th>
                          <th>Value</th>
                      </tr>
                      <tr>
                      <td>Agreement</td>
                          <td>${res.agreement}</td>
                      </tr>
                      <tr>
                          <td>Confidence</td>
                          <td>${res.confidence}</td>
                      </tr>
                      <tr>
                          <td>Irony</td>
                          <td>${res.irony}</td>
                      </tr>
                      <tr>
                          <td>Polarity</td>
                          <td>${res.score_tag}</</td>
                      </tr>
                      <tr>
                          <td>Subjectivity</td>
                          <td>${res.subjectivity}</td>
                      </tr>
                  </table>`
        } 
        else {
          values.innerHTML = `<p>${res.status.msg}</p>`;
        }
      });
    } else {
      values.innerHTML = `<p>Please enter valid url</p>`;
      setTimeout(() => {
        values.innerHTML = ""
      },2000)
    }
}

const postData = async (url = '', data = {}) => {
    // console.log(":::inside::postData")
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log("Error occurred: ", error.message);
    }
};

export { handleSubmit,
        postData }

