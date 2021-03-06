var Page = function() {
        function ViewModel() {
            var self = this;
            self.arrivals = ko.observableArray([])
        }
        return {
            vm: new ViewModel,
            hideOfflineWarning: function() {
                document.querySelector(".arrivals-list").classList.remove("loading"), document.getElementById("offline").remove()
            },
            showOfflineWarning: function() {
                document.querySelector(".arrivals-list").classList.add("loading");
                var request = new XMLHttpRequest;
                request.open("GET", "./index.php", !0), request.onload = function() {
                    if (200 === request.status) {
                        var offlineMessageElement = document.createElement("div");
                        offlineMessageElement.setAttribute("id", "offline"), offlineMessageElement.innerHTML = request.responseText, document.getElementById("main").appendChild(offlineMessageElement)
                    } else console.warn("Error retrieving offline.html")
                }, request.onerror = function() {
                    console.error("Connection error")
                }, request.send()
            }
        }
    }(),
    Arrivals = function() {
        function ArrivalViewModel() {
            var self = this;
            self.title = "", self.status = "", self.time = ""
        }

        function ArrivalApiService() {
            var self = this;
            self.getAll = function() {
                return new Promise(function(resolve, reject) {
                    var request = new XMLHttpRequest;
                    request.open("GET", "./api/data.json"), request.onload = function() {
                        200 === request.status ? resolve(JSON.parse(request.response)) : reject(Error(request.statusText))
                    }, request.onerror = function() {
                        reject(Error("Network Error"))
                    }, request.send()
                })
            }
        }

        function ArrivalAdapter() {
            var self = this;
            self.toArrivalViewModel = function(data) {
                if (data) {
                    var vm = new ArrivalViewModel;
                    return vm.title = data.title, vm.status = data.status, vm.time = data.time, vm
                }
                return null
            }, self.toArrivalViewModels = function(data) {
                return data && data.length > 0 ? data.map(function(item) {
                    return self.toArrivalViewModel(item)
                }) : []
            }
        }

        function ArrivalController(arrivalApiService, arrivalAdapter) {
            var self = this;
            self.getAll = function() {
                return arrivalApiService.getAll().then(function(response) {
                    return arrivalAdapter.toArrivalViewModels(response)
                })
            }
        }
        var arrivalApiService = new ArrivalApiService,
            arrivalAdapter = new ArrivalAdapter,
            arrivalController = new ArrivalController(arrivalApiService, arrivalAdapter);
        return {
            loadData: function() {
                document.querySelector(".arrivals-list").classList.add("loading"), arrivalController.getAll().then(function(response) {
                    Page.vm.arrivals(response), document.querySelector(".arrivals-list").classList.remove("loading")
                })
            }
        }
    }();
"serviceWorker" in navigator && navigator.serviceWorker.register("sw.js").then(function(reg) {
    console.log("Successfully registered service worker", reg)
})["catch"](function(err) {
    console.warn("Error whilst registering service worker", err)
}), window.addEventListener("online", function(e) {
    console.log("You are online"), Page.hideOfflineWarning(), Arrivals.loadData()
}, !1), window.addEventListener("offline", function(e) {
    console.log("You are offline"), Page.showOfflineWarning()
}, !1), navigator.onLine ? Arrivals.loadData() : Page.showOfflineWarning(), ko.applyBindings(Page.vm);
