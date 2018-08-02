// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.AmplitudePlugin = function (runtime) {
	this.runtime = runtime;
};

(function () {
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.AmplitudePlugin.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function (plugin) {
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function () {
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function (type) {
		this.type = type;
		this.runtime = type.runtime;

		// any other properties you need, e.g...
		// this.myValue = 0;
	};

	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function () {
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;

		var props = this.properties;

		this.apiKey = props[0];

		(function (e, t) {
			var n = e.amplitude || { _q: [], _iq: {} }; var r = t.createElement("script");
			r.type = "text/javascript"; r.async = true;
			r.src = "https://cdn.amplitude.com/libs/amplitude-4.2.1-min.gz.js";
			r.onload = function () {
				if (e.amplitude.runQueuedFunctions) {
					e.amplitude.runQueuedFunctions()
				} else {
					console.log("[Amplitude] Error: could not load SDK")
				}
			};
			var i = t.getElementsByTagName("script")[0]; i.parentNode.insertBefore(r, i);
			function s(e, t) {
				e.prototype[t] = function () {
					this._q.push([t].concat(Array.prototype.slice.call(arguments, 0))); return this
				}
			}
			var o = function () { this._q = []; return this };
			var a = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset"];
			for (var u = 0; u < a.length; u++) { s(o, a[u]) } n.Identify = o; var c = function () {
				this._q = [];
				return this
			};
			var l = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"];
			for (var p = 0; p < l.length; p++) { s(c, l[p]) } n.Revenue = c;
			var d = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut",
				"setVersionName", "setDomain", "setDeviceId", "setGlobalUserProperties", "identify",
				"clearUserProperties", "setGroup", "logRevenueV2", "regenerateDeviceId", "logEventWithTimestamp",
				"logEventWithGroups", "setSessionId", "resetSessionId"];
			function v(e) {
				function t(t) {
					e[t] = function () {
						e._q.push([t].concat(Array.prototype.slice.call(arguments, 0)))
					}
				}
				for (var n = 0; n < d.length; n++) { t(d[n]) }
			} v(n); n.getInstance = function (e) {
				e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase()
					; if (!n._iq.hasOwnProperty(e)) { n._iq[e] = { _q: [] }; v(n._iq[e]) } return n._iq[e]
			};
			e.amplitude = n
		})(window, document);

		amplitude.getInstance().init(this.apiKey);

		//this.scanTitle = props[0];
		//this.scanDesc = props[1];

		//var plugin = this;

		//qrcode.callback = read;
		//this.qrdecode["callback"] = function(res){
		//	plugin.result = res;
		//	plugin.runtime.trigger(cr.plugins_.SimpleQRScanner.prototype.cnds.onDecoded, plugin);

	};

	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function () {
	};

	// called when saving the full state of the game
	instanceProto.saveToJSON = function () {
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};

	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o) {
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};

	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function (ctx) {
	};

	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw) {
	};

	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections) {
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property

				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
	};

	instanceProto.onDebugValueEdited = function (header, name, value) {
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() { };

	// the example condition
	/*Cnds.prototype.MyCondition = function (myparam)
	{
		// return true if number is positive
		return myparam >= 0;
	};*/

	// ... other conditions here ...

	pluginProto.cnds = new Cnds();

	var cnds = pluginProto.cnds;

	/*	cnds.onDadosCarregados = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onDadosEscolaNaoEncontrados = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onDadosAlunoNaoEncontrados = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onDadosHistoriasCarregados = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onDadosHistoriasNaoEncontrados = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onNumPagsHistoriaModificado = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onSlotNaoExiste = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onErroModificandoNumPag = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onPaginaSalvaSucesso = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onErroSalvandoPagina = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onHistoriaExcluidaSucesso = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onErroExcluindoHistoria = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onPaginaRecuperadaSucesso = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};
	
		cnds.onNumPagInvalido = function () {
			// ... see other behaviors for example implementations ...
			//C
			return true;
		};*/

	//////////////////////////////////////
	// Actions
	function Acts() { };

	// the example action
	/*Acts.prototype.MyAction = function (myparam)
	{
		// alert the message
		alert(myparam);
	};*/

	// ... other actions here ...

	Acts.prototype.logEventAmplitude = function (eventName) {
		var self = this;

		amplitude.getInstance().logEvent(eventName);
		//console.log("Amplitude plugin - " + eventName);
	}

	Acts.prototype.logEventAmplitudeWithParam = function (eventName, params) {
		var self = this;

		//console.log("==> " + params);

		//console.log("==> " + params[0] + " /// " + params[1]);

		var paramsToSend = "{";

		for (var i = 0; i < params.length; i++) {
			var paramName = "", paramValue = "";

			var res = null;

			try {
				res = params[i].split(":::");

				paramName = res[0].trim();
				paramValue = res[1].trim();

				paramsToSend += ('"' + paramName + '":"' + paramValue + '"');

				if (i < params.length-1) {
					paramsToSend += ",\n"
				}
			} catch (error) {
				console.log(error.name + ": " + error.message);
			}
		}

		paramsToSend += "}";
		//console.log("==> " + paramsToSend);

		var objParam = JSON.parse(paramsToSend);

		amplitude.getInstance().logEvent(eventName,objParam);

		/*var jsonobj = null;

		try {
			console.log("JSON: " + jsonparam);
			jsonobj = JSON.parse(jsonparam);
		} catch (e) {
			console.log(error.name + ": " + error.message);
			jsonobj = null;
		}

		if (jsonobj == null) {
			console.log("Erro: formato dos parâmetros inválido.");
		} else {
			console.log("Amplitude plugin - " + eventName + " // " + jsonobj);
			amplitude.getInstance().logEvent(eventName);
			
		}*/
	}

	/*Acts.prototype.consultaAluno = function (codigo, email) {
		var self = this;

		//alert("==> " + codigo + " / " + email);

		self.aluno = null;
		self.chaveAluno = null;
		self.chaveEscola = null;

		var ref = firebase.database();
		ref.ref('escolas').orderByChild('email').equalTo(email).limitToFirst(1).once('value', function (snapshot) {
			//console.log('snap: ' + snapshot.val());

			// dados da escola não encontrados
			if (snapshot.numChildren() == 0) {
				self.aluno = null;
				self.chaveAluno = null;
				self.chaveEscola = null;
				self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onDadosEscolaNaoEncontrados, self);
			} else { // dados da escola foram encontrados...
				snapshot.forEach(function (data) {
					self.chaveEscola = data.key;

					//console.log('each: ' + data.key + ' / ' + data.val().nome);
					var ref2 = ref.ref('escolas/' + self.chaveEscola + '/alunos');
					ref2.orderByChild('codigo_aluno').equalTo(codigo).limitToFirst(1).once('value', function (snap2) {
						//console.log('snap2: ' + snap2.val());

						if (snap2.numChildren() == 0) {
							self.aluno = null;
							self.chaveAluno = null;
							self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onDadosAlunoNaoEncontrados, self);
						} else {
							snap2.forEach(function (data2) {
								var inst = self;

								//console.log('each2: ' + data2.key + ' / ' + data2.val().nome);
								self.aluno = data2.val();
								self.chaveAluno = data2.key;
								self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onDadosCarregados, inst);
							});
						}
					});
				});
			}
		});
	};


	Acts.prototype.consultaNumPagHistorias = function (codAluno) {
		var self = this;

		self.numPagHistorias = [0, 0, 0, 0];

		var alunoRef = firebase.database().ref('historias/' + codAluno + '/num_pags');

		alunoRef.once('value', function (snapshot) {
			var inst = self;

			var info_livros = snapshot.val();

			if (info_livros == null) {
				self.numPagHistorias = [0, 0, 0, 0];

				self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onDadosHistoriasNaoEncontrados, inst);
			} else {
				inst.numPagHistorias[0] = info_livros.np_historia1;
				inst.numPagHistorias[1] = info_livros.np_historia2;
				inst.numPagHistorias[2] = info_livros.np_historia3;
				inst.numPagHistorias[3] = info_livros.np_historia4;

				self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onDadosHistoriasCarregados, inst);
			}
		});
	};

	Acts.prototype.modificaNumPagHistoria = function (slot, nrPaginas, codAluno) {
		var self = this;

		if (slot < 1 && slot > 4) {
			self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onSlotNaoExiste, inst);
		} else {
			var numPagSlotRef = firebase.database().ref('historias/' + codAluno + '/num_pags/np_historia' + slot);

			numPagSlotRef.set(nrPaginas, function (error) {
				var inst = self;

				if (error) {
					self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onErroModificandoNumPag, inst);
				} else {
					self.numPagHistorias[slot - 1] = nrPaginas;
					self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onNumPagsHistoriaModificado, inst);
				}
			});
		}
	};

	Acts.prototype.salvaPagHistoria = function (codAluno, slot, np, jsonsrc, nrPaginas) {
		var self = this;

		if (slot < 1 && slot > 4) {
			self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onSlotNaoExiste, inst);
		} else {
			if (np >= nrPaginas) {
				self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onNumPagInvalido, self);
			} else {
				var pagSlotRef = firebase.database().ref('historias/' + codAluno + '/slot' + slot + '/pagina' + np);

				var myPag = {
					nrPag: np,
					json: jsonsrc
				};

				pagSlotRef.set(myPag, function (error) {
					var inst = self;

					if (error) {
						self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onErroSalvandoPagina, inst);
					} else {
						var numPagSlotRef = firebase.database().ref('historias/' + codAluno + '/num_pags/np_historia' + slot);

						numPagSlotRef.set(nrPaginas, function (error) {
							if (error) {
								self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onErroSalvandoPagina, inst);
							} else {
								self.numPagHistorias[slot - 1] = nrPaginas;

								self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onPaginaSalvaSucesso, inst);
							}
						});
					}
				});
			}
		}
	};

	Acts.prototype.excluiHistoria = function (codAluno, slot) {
		var self = this;

		self.historiaExcluida = -1;

		if (slot < 1 && slot > 4) {
			self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onSlotNaoExiste, inst);
		} else {
			var inst = self;
			var pagSlotRef = firebase.database().ref('historias/' + codAluno + '/slot' + slot);

			pagSlotRef.set({}, function (error) {
				var inst = self;

				if (error) {
					self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onErroExcluindoHistoria, inst);
				} else {
					var numPagSlotRef = firebase.database().ref('historias/' + codAluno + '/num_pags/np_historia' + slot);

					numPagSlotRef.set(0, function (error) {
						if (error) {
							self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onErroExcluindoHistoria, inst);
						} else {
							self.historiaExcluida = slot;
							self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onHistoriaExcluidaSucesso, inst);
						}
					});
				}
			});
		}
	};

	Acts.prototype.recuperaPagHistoria = function (codAluno, slot, np) {
		var self = this;

		if (slot < 1 && slot > 4) {
			self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onSlotNaoExiste, inst);
		} else {
			var historiaRef = firebase.database().ref('historias/' + codAluno + '/num_pags/np_historia' + slot);

			this.jsonHistoria = "";

			historiaRef.once('value', function (snapshot) {
				var inst = self;
				var numPaginas = snapshot.val();

				if (numPaginas == null) {
					self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onDadosHistoriasNaoEncontrados, inst);
				} else {
					if (np >= numPaginas) {
						self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onNumPagInvalido, inst);
					} else {
						var pagSlotRef = firebase.database().ref('historias/' + codAluno + '/slot' + slot + '/pagina' + np);

						pagSlotRef.once('value', function (snap2) {
							var hist = snap2.val();

							if (hist == null) {
								self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onDadosHistoriasNaoEncontrados, inst);
							} else {
								self.jsonHistoria = hist.json;
								self.runtime.trigger(cr.plugins_.FirebaseImaginaKIDS.prototype.cnds.onPaginaRecuperadaSucesso, inst);
							}
						});
					}
				}
			});
		}
	};*/


	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() { };

	// the example expression
	/*Exps.prototype.MyExpression = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};*/

	Exps.prototype.nomeAluno = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		if (this.aluno == null) {
			ret.set_string("");	// return our value
		} else {
			ret.set_string(this.aluno.nome);	// return our value
		}
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.codAluno = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		if (this.aluno == null) {
			ret.set_string("");	// return our value
		} else {
			ret.set_string(this.aluno.codigo_aluno);	// return our value
		}
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.idEscola = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		if (this.chaveEscola == null) {
			ret.set_string("");	// return our value
		} else {
			ret.set_string(this.chaveEscola);	// return our value
		}
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.idAluno = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		if (this.chaveAluno == null) {
			ret.set_string("");	// return our value
		} else {
			ret.set_string(this.chaveAluno);	// return our value
		}
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.serieAluno = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		if (this.aluno == null) {
			ret.set_string("");	// return our value
		} else {
			ret.set_string(this.aluno.turma);	// return our value
		}
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	/*Exps.prototype.historia1 = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_string(this.historias[0]);

		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.historia2 = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_string(this.historias[1]);
		
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.historia3 = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_string(this.historias[2]);
		
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.historia4 = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_string(this.historias[3]);
		
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};*/

	Exps.prototype.npHistoria1 = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(this.numPagHistorias[0]);

		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.npHistoria2 = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(this.numPagHistorias[1]);

		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.npHistoria3 = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(this.numPagHistorias[2]);

		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.npHistoria4 = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(this.numPagHistorias[3]);

		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.jsonHist = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_string(this.jsonHistoria);

		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	Exps.prototype.historiaExcluida = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(this.historiaExcluida);

		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

	// ... other expressions here ...

	pluginProto.exps = new Exps();

}());