function GetPluginSettings()
{
	return {
		"name":			"Amplitude Plugin",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"AmplitudePlugin",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Amplitude Analytics Plugin for Construct",
		"author":		"Rafael Fernandes Lopes (rafaelf@imaginakids.com.br)",
		"help url":		"http://www.imaginakids.com.br/",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0						// uncomment lines to enable flags...
					//	| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				
//AddNumberParam("Number", "Enter a number to test if positive.");
//AddCondition(0, cf_none, "Is number positive", "My category", "{0} is positive", "Description for my condition!", "MyCondition");
//AddCondition(0, cf_trigger, "QR Decoded Success", "QR Code", "QR Code has been decoded", "QR Code has been decoded", "onDecoded");
//AddCondition(1, cf_trigger, "QR Decoded Error", "QR Code", "Error decoding the QR Code", "Error decoding the QR Code", "onDecodeError");
//AddCondition(2, cf_trigger, "QR Decoded Cancel", "QR Code", "QR Code decoding was cancelled", "QR Code decoding was cancelled", "onDecodeCancel");

/*AddCondition(0, cf_trigger, "Dados do aluno carregados", "ImaginaKIDS - Carregamento", "Carregamento dos dados do aluno concluídos.", "Carregamento dos dados do aluno concluídos.", "onDadosCarregados");

AddCondition(1, cf_trigger, "Dados da escola não encontrados", "ImaginaKIDS - Erro", "Dados da escola não foram encontrados.", "Dados da escola não foram encontrados.", "onDadosEscolaNaoEncontrados");

AddCondition(2, cf_trigger, "Dados do aluno não encontrados", "ImaginaKIDS - Erro", "Dados do aluno não foram encontrados.", "Dados do aluno não foram encontrados.", "onDadosAlunoNaoEncontrados");

AddCondition(3, cf_trigger, "Dados das histórias carregadas", "ImaginaKIDS - Carregamento", "Carregamento dos dados das histórias concluídas.", "Carregamento dos dados das histórias concluídas.", "onDadosHistoriasCarregados");

AddCondition(4, cf_trigger, "Dados das histórias não encontrados", "ImaginaKIDS - Erro", "Dados das histórias não foram encontrados.", "Dados das histórias não foram encontrados.", "onDadosHistoriasNaoEncontrados");

AddCondition(5, cf_trigger, "Número de páginas modificado", "ImaginaKIDS - Carregamento", "Número de páginas de uma história foi modificado.", "Número de páginas de uma histária foi modificado.", "onNumPagsHistoriaModificado");

AddCondition(6, cf_trigger, "Número do slot a história não existe", "ImaginaKIDS - Erro", "Número do slot da história não existe.", "Número do slot da história não existe.", "onSlotNaoExiste");

AddCondition(7, cf_trigger, "Erro modificando o número de páginas", "ImaginaKIDS - Erro", "Erro modificando o número de páginas de uma história.", "Erro modificando o número de páginas de uma história.", "onErroModificandoNumPag");

AddCondition(8, cf_trigger, "Dados da página gravados com sucesso", "ImaginaKIDS - Carregamento", "Dados da página gravados com sucesso na nuvem.", "Dados da página gravados com sucesso na nuvem.", "onPaginaSalvaSucesso");

AddCondition(9, cf_trigger, "Erro salvando página na nuvem", "ImaginaKIDS - Erro", "Erro salvando página da história na nuvem.", "Erro salvando página da história na nuvem.", "onErroSalvandoPagina");

AddCondition(10, cf_trigger, "História excluída com sucesso", "ImaginaKIDS - Carregamento", "História excluída com sucesso da nuvem.", "História excluída com sucesso da nuvem.", "onHistoriaExcluidaSucesso");

AddCondition(11, cf_trigger, "Erro excluindo história", "ImaginaKIDS - Erro", "Erro excluindo história da nuvem.", "Erro excluindo história da nuvem.", "onErroExcluindoHistoria");

AddCondition(12, cf_trigger, "JSON da página recuperado com sucesso", "ImaginaKIDS - Carregamento", "JSON da página recuperado com sucesso.", "JSON da página recuperado com sucesso.", "onPaginaRecuperadaSucesso");

AddCondition(13, cf_trigger, "Número da página inválido", "ImaginaKIDS - Erro", "Número da página inválido.", "Número da página inválido.", "onNumPagInvalido");*/

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
//AddStringParam("Message", "Enter a string to alert.");
//AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");

//AddObjectParam("QR Code : ", "Sprite containing  QR Code to decode.");
//AddAction(0, af_none, "Decode", "QR Code", "Decode QR Code from {0}", "Decode QR Code.", "qrDecode");

AddStringParam("Event Name", "Name of the event to be logged on Amplitude.");
AddAction(0, af_none, "Log Simple Event", "Amplitude", "Log event {0} on Amplitude", "Log an event on Amplitude", "logEventAmplitude");

//AddStringParam("Event Parameters", "Event parameters in JSON format.");
AddStringParam("Event Name", "Name of the event to be logged on Amplitude.");
AddVariadicParams("Parameter {n}", "Parameters to be sent with the event to Amplitude. Each one should be written as a string in the format 'PARAM_NAME:::PARAM_VALUE'.");
AddAction(1, af_none, "Log Event with parameters", "Amplitude", "Log event {0} on Amplitude with parameters", "Log an event on Amplitude", "logEventAmplitudeWithParam");

/*AddStringParam("Codigo do Aluno", "Código do aluno a ser consultado.");
AddStringParam("Email da Escola", "Email da escola a ser consultada.");
AddAction(0, af_none, "Consulta aluno", "ImaginaKIDS", "Consulta aluno {0} da escola {1}", "Consulta dos dados do aluno no banco de dados da escola.", "consultaAluno");

AddStringParam("Codigo do Aluno", "Código do aluno a ser consultado.");
AddAction(1, af_none, "Consulta número de páginas de uma historia", "ImaginaKIDS", "Consulta histórias do aluno {0}", "Consulta as histórias de um aluno no banco de dados da escola.", "consultaNumPagHistorias");

AddNumberParam("Slot", "Número do slot a ser modificado (1 à 4).");
AddNumberParam("Número de páginas", "Novo número de páginas a ser definido.");
AddStringParam("Codigo do Aluno", "Código do aluno a ser consultado.");
AddAction(2, af_none, "Modifica número de páginas de uma historia", "ImaginaKIDS", "Modifica o número de páginas da história no slot {0} para {1}, referente ao aluno {2}", "Modifica o número de páginas de uma história de uma aluno.", "modificaNumPagHistoria");

AddStringParam("Codigo do Aluno", "Código do aluno a ser consultado.");
AddNumberParam("Slot", "Número do slot a ser modificado (1 à 4).");
AddNumberParam("Número da página", "Número da página a ser salva.");
AddStringParam("JSON da página", "JSON da página a ser gravada.");
AddNumberParam("Total de Páginas", "Total de páginas da história.");
AddAction(3, af_none, "Salva página da história na nuvem", "ImaginaKIDS", "Salva a história do aluno {0}, no slot {1}, página {2} com o conteúdo {3}. Atualiza o total de páginas para {4}.", "Salva página da história na nuvem.", "salvaPagHistoria");

AddStringParam("Codigo do Aluno", "Código do aluno a ser consultado.");
AddNumberParam("Slot", "Número do slot a ser modificado (1 à 4).");
AddAction(4, af_none, "Excluir livro de histórias", "ImaginaKIDS", "Exclui o livro do aluno {0} no slot {1}", "Exclui livro de história da nuvem.", "excluiHistoria");

AddStringParam("Codigo do Aluno", "Código do aluno a ser consultado.");
AddNumberParam("Slot", "Número do slot a ser modificado (1 à 4).");
AddNumberParam("Número da página", "Número da página a ser salva.");
AddAction(5, af_none, "Recupera o JSON de uma página de uma historia", "ImaginaKIDS", "Recupera o JSON da página {2}, do slot {1} da história do aluno {0}", "Recupera o JSON de uma página de uma historia do banco de dados da escola.", "recuperaPagHistoria");*/

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
//AddExpression(0, ef_return_number, "Leet expression", "My category", "MyExpression", "Return the number 1337.");
/*AddExpression(0, ef_return_string, "Nome do aluno", "ImaginaKIDS", "nomeAluno", "Retorna o nome do aluno.");

AddExpression(1, ef_return_string, "Código do aluno", "ImaginaKIDS", "codAluno", "Retorna o código do aluno.");

AddExpression(2, ef_return_string, "ID da escola", "ImaginaKIDS", "idEscola", "Retorna o ID da escola.");

AddExpression(3, ef_return_string, "ID do aluno", "ImaginaKIDS", "idAluno", "Retorna o ID do aluno.");

AddExpression(4, ef_return_number, "Número de páginas da história 1", "ImaginaKIDS", "npHistoria1", "Retorna o número de páginas da história 1.");
AddExpression(5, ef_return_number, "Número de páginas da história 2", "ImaginaKIDS", "npHistoria2", "Retorna o número de páginas da história 2.");
AddExpression(6, ef_return_number, "Número de páginas da história 3", "ImaginaKIDS", "npHistoria3", "Retorna o número de páginas da história 3.");
AddExpression(7, ef_return_number, "Número de páginas da história 4", "ImaginaKIDS", "npHistoria4", "Retorna o número de páginas da história 4.");

AddExpression(8, ef_return_string, "JSON da página recuperada", "ImaginaKIDS", "jsonHist", "Retorna o JSON da última página recuperada.");

AddExpression(9, ef_return_number, "Número do slot exluído", "ImaginaKIDS", "historiaExcluida", "Retorna o número do slot excluído.");

AddExpression(10, ef_return_string, "Série do aluno", "ImaginaKIDS", "serieAluno", "Retorna a série do aluno.");*/

/*AddExpression(8, ef_return_string, "JSON da História 1", "ImaginaKIDS", "historia1", "Retorna o JSON da história 1.");
AddExpression(9, ef_return_string, "JSON da História 2", "ImaginaKIDS", "historia2", "Retorna o JSON da história 2.");
AddExpression(10, ef_return_string, "JSON da História 3", "ImaginaKIDS", "historia3", "Retorna o JSON da história 3.");
AddExpression(11, ef_return_string, "JSON da História 4", "ImaginaKIDS", "historia4", "Retorna o JSON da história 4.");*/

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
	new cr.Property(ept_text,	"API Key",		"",		"Your Amplitude API Key.")
	//new cr.Property(ept_text, "Title", "SimpleQRScanner", "Title text when scanning."),
	//new cr.Property(ept_text, "Description", "Align the QR Code in the viewfinder", "Description text when scanning.")
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}