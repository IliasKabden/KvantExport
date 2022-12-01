var laySet = [];
define(["jquery",
	"qlik",
	"css!./css/KvantExport",
	"./js/FileSaver",
	"./js/jquery.wordexport",
	"./js/html2pdf.bundle.min",
	"./Properties"
],
	function ($, qlik, cssContent, FileSaver, wordexport, htmltopdf, properties) {
		'use strict';

		$('<link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">').appendTo("head");

		function toggleId() {
			var arr = [];
			var vWidth = '20000px';
			var vHeight = '50000px';
			var vTableType = '';
			var idcombochart = [];
			var template = [];
			var QVKvantExport = [];
			
			$('.qv-object, .qv-panel-sheet').each(function (i, el) {
				var s = angular.element(el).scope();
				if (s.layout || (s.$$childHead && s.$$childHead.layout)) {
					if (s.model.layout.qInfo.qType == 'container') {
						var layout = s.layout || s.$$childHead.layout, model = s.model || s.$$childHead.model;
						for (var i = 0; i < layout.children.length; i++) {
							var layout = s.layout || s.$$childHead.layout, model = s.model || s.$$childHead.model;
							arr.push(layout.qChildList.qItems[i]);
						}
						
						$(el).append('<div class="KvantExport-tooltip">' +
						'<a id="KvantExportBtn" class="KvantExport-btn" style="color:' + laySet.color + ';background:' + laySet.background + '" title="properties"><i class="small material-icons">get_app</i></a>' +
						'</div>');
						
					}
					if (s.model.layout.qInfo.qType == 'table' || s.model.layout.qInfo.qType == 'pivot-table' || s.model.layout.qInfo.qType == 'combochart' || s.model.layout.qInfo.qType == 'piechart' || s.model.layout.qInfo.qType == 'barchart') {// || s.model.layout.qInfo.qType == 'qlik-smart-pivot'){
						if (s.model.layout.qInfo.qType == 'combochart' || s.model.layout.qInfo.qType == 'piechart' || s.model.layout.qInfo.qType == 'barchart') {
							idcombochart.push(s.model.layout.qInfo.qId);
							var layout = s.layout || s.$$childHead.layout, model = s.model || s.$$childHead.model;
						}
						else {
							var layout = s.layout || s.$$childHead.layout, model = s.model || s.$$childHead.model;
							arr.push(layout);
							// $(el).append('<div class="KvantExport-tooltip">' +
							// 	'<a id="KvantExportBtn" class="KvantExport-btn" style="color:' + laySet.color + ';background:' + laySet.background + '" title="properties"><i class="small material-icons">get_app</i></a>' +
							// 	'</div>');
						}
					}

					$(el).find('#KvantExportBtn').on('click', function () {
						vTableType = this.title;
						model.getProperties().then(function (reply) {
							var app = qlik.currApp();
							var vObjectId = reply.qInfo.qId;
							var vObjectType = reply.qInfo.qType;



							app.getObject('CurrentSelections').then(function (model) {

								for (var i = 0; i < arr.length; i++) {
									var nameArr = 'QVKvantExport00' + [i];
									QVKvantExport.push(app.getObject(nameArr, arr[i].qInfo.qId));
									template.push('<div class="modal-body"><div class="qvobject" id="QVKvantExport00' + [i] + '" style="position: relative; width: ' + vWidth + ';height:' + vHeight + ';"></div></div>');
								}

								var vModal = '<div id="myModal" class="modal">' +
									'<div class="modal-content">' +
									'<div class="modal-header">' +
									'<span class="close"> x </span>' +
									'<h4> (  preview ) </h4>' +
									'</div>' +
									'<div id="ilias">' +
										template.toString() +
									'</div>' +
									'<div id="ExportEditor" style="position: fixed; z-index:2; width: 100%; height: 100%; left: 0; top: 125px;background:#ccc;opacity:0.8">' +
									'<button id="XLSButton" class="XLSbtn">XLS</button>' +
									'<button id="WordButton" class="Wordbtn">Word</button>' +
									'</div>' +
									'<div class="modal-footer">' +
									'<h3>Modal Footer</h3>' +
									'</div>' +
									'</div>' +
									'</div>';

								if (document.getElementById('myModal')) {
									document.getElementById('myModal').remove();
								}

								$(document.body).append(vModal);

								var modal = document.getElementById('myModal');


								var span = document.getElementsByClassName("close")[0];

								modal.style.display = "block";

								XLSButton.onclick = function () {

									var vEncodeHead = '<html><head><meta charset="UTF-8"></head>';
									var vEncodeCode = document.getElementsByClassName('qvobject');
									var vEncodeBody = [];
									for (var i = 0; i < vEncodeCode.length; i++) {

										var labels = vEncodeCode[i].getElementsByTagName("label");

										if (labels.length > 1 && labels[1].title == "") {
											labels[1].remove();
										}

										for (var vLabel = 0; vLabel < labels.length; vLabel++) {
											if (labels[vLabel].innerText == 'Table' || labels[vLabel].innerText == 'Pivot table' || labels[vLabel].innerText == 'Load previous' || labels[vLabel].innerText == 'Load more') {
												labels[vLabel].remove();
											}
										}

										var header = vEncodeCode[i].getElementsByTagName("header");
										if (!laySet.title) {
											header[0].remove();
										} else {
											var H1s = header[0].getElementsByTagName("h1");
											H1s[0].outerHTML = H1s[0].outerHTML.replace("<h1", "<div").replace("</h1>", "</div>");

											if (!laySet.subtitle && reply.subtitle != "") {
												var header = vEncodeCode[i].getElementsByTagName("header");
												var subtitle = header[0].getElementsByTagName("h2");
												subtitle[0].remove();
											}
										}
										if (!laySet.footer) {
											var footer = vEncodeCode[i].getElementsByClassName("qv-footer-wrapper");
											footer[0].remove();
										}

										vEncodeBody.push(vEncodeCode[i].innerHTML.replace("Load previous", "").replace("Load more", ""));
										var blob = new Blob([vEncodeHead + vEncodeBody + '</html>'], {
											type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
										});
										saveAs(blob, "Report.xls");
									}
								}

								WordButton.onclick = function () {
									for (var i = 0; i < idcombochart.length; i++) {
										var settings = { format: 'png', height: 800, width: 1000 }
										app.visualization.get(idcombochart[i]).then(function (vis) {
											vis.exportImg(settings).then(function (result) {
												toDataURL(result, function (data) {
													document.getElementById('ilias').innerHTML += '<img src="' + data + '" alt="Red dot" /> ';
												})
											});
										});
									}

									setTimeout("$('#ilias').wordExport('Repost'); $('#ilias').html('');", 10000);

									modal.style.display = "none";
									function toDataURL(url, callback) {
										let xhRequest = new XMLHttpRequest();
										xhRequest.onload = function () {
											let reader = new FileReader();
											reader.onloadend = function () {
												callback(reader.result);
											}
											reader.readAsDataURL(xhRequest.response);
										};
										xhRequest.open('GET', url);
										xhRequest.responseType = 'blob';
										xhRequest.send();
									}

								}

								// When the user clicks on <span> (x), close the modal
								span.onclick = function () {
									$('#ilias').html('');
									modal.style.display = "none";
								}
							})
						})
					})
				}
			})
		}

		return {
			initialProperties: {
				version: 1.0,
				showTitles: false
			},
			definition: properties,
			paint: function ($element, layout) {
				laySet = { "title": layout.titlebool, "subtitle": layout.subtitlebool, "footer": layout.footerbool, "selections": layout.selectionsbool, "background": layout.iconbackground.color, "color": layout.iconcolor.color };
				$(".KvantExport-tooltip").remove();
				toggleId();
			}
		};
	});