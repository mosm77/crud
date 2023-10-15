document.addEventListener("DOMContentLoaded", function() {
    var app = {
        el: document.getElementById('countries'),
        countries: ['France', 'Germany', 'England', 'Spain', 'Belgium', 'Italy', 'Portugal', 'Ireland', 'Luxembourg'],
        Count: function(data) {
            var el = document.getElementById('counter');
            var name = 'country';
            if (data) {
                name = (data > 1) ? 'countries' : 'country';
                el.innerHTML = data + ' ' + name;
            } else {
                el.innerHTML = 'No ' + name;
            }
        },
        FetchAll: function() {
            var data = '';
            if (this.countries.length > 0) {
                for (var i = 0; i < this.countries.length; i++) {
                    data += '<tr>';
                    data += '<td>' + this.countries[i] + '</td>';
                    data += '<td><button onclick="app.Edit(' + i + ')">Edit</button></td>';
                    data += '<td><button onclick="app.Delete(' + i + ')">Delete</button></td>';
                    data += '</tr>';
                }
            }
            this.Count(this.countries.length);
            this.el.innerHTML = data;
        },
        Add: function() {
            var el = document.getElementById('add-name');
            var country = el.value.trim();
            if (country) {
                this.countries.push(country);
                el.value = '';
                this.FetchAll();
            }
        },
        Edit: function(item) {
            var el = document.getElementById('edit-name');
            el.value = this.countries[item];
            document.getElementById('spoiler').style.display = 'block';
            var self = this;
            document.getElementById('saveEdit').onsubmit = function(event) {
                event.preventDefault();
                var country = el.value.trim();
                if (country) {
                    self.countries.splice(item, 1, country);
                    self.FetchAll();
                    CloseInput();
                }
            };
        },
        Delete: function(item) {
            this.countries.splice(item, 1);
            this.FetchAll();
        }
    };

    function CloseInput() {
        document.getElementById('spoiler').style.display = 'none';
    }

    document.getElementById('addBtn').addEventListener('click', function() {
        app.Add();
    });

    app.FetchAll();
});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
