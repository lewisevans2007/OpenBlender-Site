if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    var root = '/';
    document.getElementById('title').innerHTML = 'OpenBlender - Locally hosted';
} else {
    var root = '/OpenBlender-Site/';
}

function get_projects(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', root + 'files.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.send();
}

function display_projects() {
    get_projects(function (projects) {
        var FXGallery = document.getElementById('FXGallery');
        var CompositingGallery = document.getElementById('CompositingGallery');
        var PlaygroundsGallery = document.getElementById('PlaygroundsGallery');
        var ObjectsGallery = document.getElementById('ObjectGallery');
        var DemoFilesGallery = document.getElementById('DemoFileGallery');
        projects.Projects.forEach(function (project) {
            var project_div = document.createElement('div');
            project_div.className = 'project';
            project_div.onclick = function () {
                window.location.href = root+'view_project.html?project=' + project.Name;
            }

            var project_name = document.createElement('h3');
            project_name.innerHTML = project.Name;
            if (project.Icons.Is3D === 'True') {
                project_name.innerHTML += ' <i class="bi bi-box" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.IsAsset === 'True') {
                project_name.innerHTML += ' <i class="bi bi-bookmark-fill" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.RequiresFastComputer === 'True') {
                project_name.innerHTML += ' <i class="bi bi-speedometer2" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.IsAnimated === 'True') {
                project_name.innerHTML += ' <i class="bi bi-record-circle-fill" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.IsRigged === 'True') {
                project_name.innerHTML += ' <i class="bi bi-universal-access" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.IsCurves === 'True') {
                project_name.innerHTML += ' <i class="bi bi-bezier" style="color: #999;margin-left: 5px;"></i>';
            }


            var thumbnail_img = document.createElement('img');
            thumbnail_img.className = 'thumbnail';
            if (project.Thumbnail) {
                thumbnail_img.src = project.Thumbnail;
            } else {
                thumbnail_img.src = root+'img/placeholder.png';
            }

            var details_div = document.createElement('div');
            details_div.className = 'details';


            var description = document.createElement('p');
            description.innerHTML = project.Description;
            description.style = 'font-size: 14px; margin-top: 5px;margin-bottom: none;';

            var render_engine = document.createElement('p');
            render_engine.innerHTML = project.Engine;
            render_engine.style = 'font-size: 12px; margin-top: none;margin-bottom: 5px;';

            
            var blender_link = document.createElement('a');
            blender_link.href = project.Blender_File;
            blender_link.innerHTML = '<i class="bi bi-download"></i> Blender File';

            var project_link = document.createElement('a');
            project_link.onclick = function () {
                window.location.href = root+'view_project.html?project=' + project.Name;
            }
            project_link.innerHTML = 'View Project';

            project_div.appendChild(project_name);
            project_div.appendChild(thumbnail_img);
            details_div.appendChild(description);
            details_div.appendChild(render_engine);
            details_div.appendChild(blender_link);
            details_div.appendChild(project_link);
            project_div.appendChild(details_div);

            if (project.Category === 'FX') {
                FXGallery.appendChild(project_div);
            } else if (project.Category === 'Compositing') {
                CompositingGallery.appendChild(project_div);
            } else if (project.Category === 'Playgrounds') {
                PlaygroundsGallery.appendChild(project_div);
            } else if (project.Category === 'Object') {
                ObjectsGallery.appendChild(project_div);
            } else if (project.Category === 'DemoFile') {
                DemoFilesGallery.appendChild(project_div);
            }
        });
    });
}

display_projects();
