document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde mevcut kursları dropdown menüsüne yükle
    loadCoursesToDropdown();

    //register to course
    document.getElementById('course-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var courseName = document.getElementById('course-name').value;
        var gradingScaleType = document.getElementById('grading-scale-type').value;
        var courseCredit = parseInt(document.getElementById('course-credit').value); // Kredi bilgisini al
        var gradingScale = {};

        
        if (courseCredit < 1 || courseCredit > 8) {
            alert('Kredi değeri 1 ile 8 arasında olmalıdır.');
            return; 
        }

        // grading scale
        if (gradingScaleType === '10') {
            gradingScale = {'A': 90, 'B': 80, 'C': 70, 'D': 60, 'F': 50};
        } else if (gradingScaleType === '7') {
            gradingScale = {'A': 7, 'B': 5, 'C': 3, 'D': 2, 'F': 1};
        }

        var newCourse = {
            name: courseName,
            gradingScale: gradingScale,
            gradingScaleType: gradingScaleType,
            credit: courseCredit 
        };

        fetch('http://localhost:3000/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCourse)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            addCourseToDropdown(data); 
            alert('Başarılı');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Kurs ekleme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        });

        e.target.reset();
    });

    
    document.getElementById('student-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var student = {
            name: document.getElementById('student-name').value,
            surname: document.getElementById('student-surname').value,
            id: document.getElementById('student-id').value,
            course: document.getElementById('student-course').value,
            midtermScore: document.getElementById('student-midterm').value,
            finalScore: document.getElementById('student-final').value
        };

        fetch('http://localhost:3000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            displayStudents(); // update student list
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Öğrenci ekleme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        });

        e.target.reset();
    });


    document.getElementById('show-students').addEventListener('click', function() {
        toggleStudents();
    });

    document.getElementById('show-courses').addEventListener('click', function() {
        toggleCourses();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde mevcut kursları dropdown menüsüne yükle
    loadCoursesToDropdown();

    // Kurs kayıt formu submit işlemi
    document.getElementById('course-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var courseName = document.getElementById('course-name').value;
        var gradingScaleType = document.getElementById('grading-scale-type').value;
        var courseCredit = parseInt(document.getElementById('course-credit').value); // Kredi bilgisini al
        var gradingScale = {};

        // Kredi değerinin 1 ile 8 arasında olduğunu kontrol et
        if (courseCredit < 1 || courseCredit > 8) {
            alert('Kredi değeri 1 ile 8 arasında olmalıdır.');
            return; // Fonksiyonu erken sonlandır
        }

        // Not ölçeğini ayarla
        if (gradingScaleType === '10') {
            gradingScale = {'A': 90, 'B': 80, 'C': 70, 'D': 60, 'F': 50};
        } else if (gradingScaleType === '7') {
            gradingScale = {'A': 7, 'B': 5, 'C': 3, 'D': 2, 'F': 1};
        }

        var newCourse = {
            name: courseName,
            gradingScale: gradingScale,
            gradingScaleType: gradingScaleType,
            credit: courseCredit // Kredi bilgisini ekle
        };

        fetch('http://localhost:3000/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCourse)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            addCourseToDropdown(data); // Yeni kursu dropdown menüsüne ekleyin
            alert('Başarılı');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Kurs ekleme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        });

        e.target.reset();
    });

    // Öğrenci kayıt formu submit işlemi
    document.getElementById('student-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var student = {
            name: document.getElementById('student-name').value,
            surname: document.getElementById('student-surname').value,
            id: document.getElementById('student-id').value,
            course: document.getElementById('student-course').value,
            midtermScore: document.getElementById('student-midterm').value,
            finalScore: document.getElementById('student-final').value
        };

        fetch('http://localhost:3000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            displayStudents(); // Öğrenci listesini güncelle
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Öğrenci ekleme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        });

        e.target.reset();
    });

    // Öğrenci ve kursları gösteren butonlar
    document.getElementById('show-students').addEventListener('click', function() {
        toggleStudents();
    });

    document.getElementById('show-courses').addEventListener('click', function() {
        toggleCourses();
    });
});

// Kursları dropdown menüsüne ekleyen fonksiyon
function addCourseToDropdown(course) {
    var courseSelect = document.getElementById('student-course');
    var option = document.createElement('option');
    option.value = course.name;
    option.textContent = course.name;
    courseSelect.appendChild(option);
    console.log('Course added to dropdown:', course.name); // Konsola bilgi mesajı
}

// Mevcut kursları dropdown menüsüne yükleyen fonksiyon
function loadCoursesToDropdown() {
    fetch('http://localhost:3000/courses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(courses => {
        var courseSelect = document.getElementById('student-course');
        courseSelect.innerHTML = ''; // Mevcut seçenekleri temizle
        console.log('Courses fetched:', courses); // Konsola bilgi mesajı
        courses.forEach(course => {
            var option = document.createElement('option');
            option.value = course.name;
            option.textContent = course.name;
            courseSelect.appendChild(option);
            console.log('Course added to dropdown:', course.name); // Konsola bilgi mesajı
        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('Kurs bilgilerini alırken bir hata oluştu. Lütfen tekrar deneyin.');
    });
}

function addCourseToDropdown(course) {
    var courseSelect = document.getElementById('student-course');
    var option = document.createElement('option');
    option.value = course.name;
    option.textContent = course.name;
    courseSelect.appendChild(option);
    console.log('Course added to dropdown:', course.name); 
}


function loadCoursesToDropdown() {
    fetch('http://localhost:3000/courses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(courses => {
        var courseSelect = document.getElementById('student-course');
        courseSelect.innerHTML = ''; // clear the area
        console.log('Courses fetched:', courses); 
        courses.forEach(course => {
            var option = document.createElement('option');
            option.value = course.name;
            option.textContent = course.name;
            courseSelect.appendChild(option);
            console.log('Course added to dropdown:', course.name); 
        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('Kurs bilgilerini alırken bir hata oluştu. Lütfen tekrar deneyin.');
    });
}


function displayStudents() {
    fetch('http://localhost:3000/students', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(students => {
        const container = document.getElementById('results-container');
        let html = '';

        if (students.length > 0) {
            html += '<table><tr><th>ID</th><th>Ad</th><th>Soyad</th><th>Ders</th><th>Ara Sınav</th><th>Final</th><th>İşlem</th></tr>';
            students.forEach(student => {
                html += `<tr>
                            <td>${student.id}</td>
                            <td>${student.name}</td>
                            <td>${student.surname}</td>
                            <td>${student.course}</td>
                            <td>${student.midtermScore}</td>
                            <td>${student.finalScore}</td>
                            <td><button onclick="deleteStudent(${student.id})">Remove</button></td>
                          </tr>`;
            });
            html += '</table>';
        } else {
            html = '<p>Kayıtlı öğrenci bulunamadı.</p>';
        }

        container.innerHTML = html;
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('Öğrenci bilgilerini alırken bir hata oluştu. Lütfen tekrar deneyin.');
    });
}


function toggleStudents() {
    var studentsDiv = document.getElementById('results-container');
    if (studentsDiv.style.display == 'none' || studentsDiv.style.display == '') {
        displayStudents();
        studentsDiv.style.display = 'block';
    } else {
        studentsDiv.style.display = 'none';
    }
}


function toggleCourses() {
    var coursesDiv = document.getElementById('results-container');
    if (coursesDiv.style.display == 'none' || coursesDiv.style.display == '') {
        displayCourses();
        coursesDiv.style.display = 'block';
    } else {
        coursesDiv.style.display = 'none';
    }
}

function displayCourses() {
    fetch('http://localhost:3000/courses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(courses => {
        var courseListDiv = document.getElementById('results-container');

        if (courses.length === 0) {
            courseListDiv.innerHTML = '<p>Kayıtlı Kurs Bulunmamaktadır</p>';
            return;
        }

        var tableHtml = '<table border="1"><tr><th>Kurs Adı</th><th>Not Ölçeği Türü</th><th>Not Ölçeği</th><th>Kredi</th></tr>';
        courses.forEach(function(course) {
            tableHtml += `<tr><td>${course.name}</td><td>${course.gradingScaleType || 'Bilinmiyor'}</td><td>`;
            for (var grade in course.gradingScale) {
                tableHtml += `${grade}: ${course.gradingScale[grade]}, `;
            }
            tableHtml = tableHtml.slice(0, -2); // Son virgülü kaldır
            tableHtml += `</td><td>${course.credit || 'Belirtilmemiş'}</td></tr>`; // Kredi bilgisini ekle
        });
        tableHtml += '</table>';

        courseListDiv.innerHTML = tableHtml;
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('Kurs bilgilerini alırken bir hata oluştu. Lütfen tekrar deneyin.');
    });
}
