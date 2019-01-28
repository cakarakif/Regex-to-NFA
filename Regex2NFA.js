

//////**************************/////////
//////--------BİLGİLENDİRME------/////////
/////--1)Kodun sonundaki 'ControlPart' kısmından istenilen yapı 'TestNFA(regex,path)' fonksiyonunda kontrol edilebilir!
/////--2)Concat işlemi '.' karakteriyle sağlandı. İstenilen Regex yazılırken concat için bu karakter kullanılmalıdır!
//////**************************/////////



function Stack() {
  this.dataStore = [];
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.length = length;
}
 
function push(element) {
	this.dataStore[this.top++] = element;
}
 
function pop() {
  return this.dataStore[--this.top];
}
 
function peek() {
  return this.dataStore[this.top-1];
}
 
function length() {
  return this.top;
}
function convert(infix){ 

infix = infix.replace(/\s+/g, ''); 
var s = new Stack();
var ops = ".+*";
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var precedence = {"*":3,"+":1, ".":2};                     //Operasyonlar önem sırasına göre derecelendirildi.
var associativity = {"*":"Left","+":"Left", ".":"Left"};   //Operasyonların konumları belirlendi.
var token;
var postfix = "";
var bagOne, bagTwo;

for (var i = 0; i < infix.length; i++) {                   //İnfix yapısı Postfix yapısına çevirildi.
  token = infix[i];
  for ( var t=0; t<alphabet.length;t++){          //Terimler Postfix'e eklendi.
  if (token == alphabet[t]) 
  { 
    postfix += token + " ";
  }
 }
   if (ops.indexOf(token) != -1) { 
    bagOne = token;
		bagTwo = s.peek();
		if(bagOne=='*'){
			postfix += bagOne + " ";
		}else{
    while (ops.indexOf(bagTwo)!=-1 && ((associativity[bagOne] == "Left" && (precedence[bagOne] <= precedence[bagTwo])))) 
      {                                           //Postfix konumlandırılması sağlandı.
        postfix += bagTwo + " ";
        s.pop(); 
        bagTwo = s.peek(); 
    }
   s.push(bagOne);
	}
}
  else if (token == "(") {                       //Parantez kontrolü sağlandı.
    s.push(token); 
  }
  else if (token == ")") { 
    while (s.peek() != "("){ 
      postfix += s.pop() + " ";
    }
   s.pop();
  }
}
while(s.peek()!=null)  postfix += s.pop() + " ";
create(postfix);                                //Postfix işlem yapılması için fonksiyona gönderildi.

}
//////**************************/////////

var nfa = new LinkedList();
var budget=new Stack();
var Tnode=new Stack;
var Tbag=new Stack;
var tempL=new Stack;
var tempS;
var checkChar;
var controlFlag;
var dot=0;
function Node(accept){
  this.flink = null;
  this.slink = null;
  this.accept=accept;      //Node'un accept bilgisi tutulur.
  this.isVisibility=false; //Gezinirlik bilgisi tutulur. 
  this.fType=null;
	this.sType=null;
  this.setStatus=0;        
};
function LinkedList() {
  this.startState = null;
};
function createAdd(type) { //Karakter için state yapısı oluşturuldu.
  tempS=new LinkedList();
  var first = new Node(false);
  first.fType=type;
  tempS.startState=first;
  var second = new Node(true);
  tempS.startState.flink=second;  
  return tempS;
	};
	
//////**************************/////////
function starAdd(){ //Gönderilen state için '*' işlemi gerçekleştirildi.
	 tempL=new LinkedList();
	tempL=budget.pop();
	dot++;
	setAllflag(tempL.startState);
  searchStar(tempL.startState);
	var firstAccept = new Node(true);
	firstAccept.fType='$';
	firstAccept.flink=tempL.startState;
	tempL.startState=firstAccept;	
	budget.push(tempL);
};	
 
function searchStar(root) 
{  //Accept stateler bulundu.
     root.isVisibility=true;
	  if (root.accept == true) {
		if(root.flink==null){
		root.flink=tempL.startState;
		root.fType='$';
		}
		else{
		root.slink=tempL.startState;
		root.sType='$';
		}
	}
	if (root.flink != null && root.flink.isVisibility==false){
		searchStar(root.flink);}
    if(root.slink != null && root.slink.isVisibility==false){
	    searchStar(root.slink); 
	}	
} ;
//////**************************/////////
function unionAdd(){ //Gönderilen state için '+' işlemi gerçekleştirildi.
  tempL=new LinkedList();
	tempS=new LinkedList();
	tempS=budget.pop();
	tempL=budget.pop();
	var firstNode = new Node(false);
  firstNode.fType='$';
	firstNode.sType='$';
	firstNode.flink=tempL.startState;
	tempL.startState=firstNode;
	tempL.startState.slink=tempS.startState;
	budget.push(tempL);
};
//////**************************/////////
function concatAdd(){ //Gönderilen state için '.' işlemi gerçekleştirildi.
	tempL=new LinkedList();
	tempS=new LinkedList();
	tempS=budget.pop();
	tempL=budget.pop();
	dot++;
	setAllflag(tempL.startState);
	searchConcat(tempL.startState);
  budget.push(tempL);
};

function searchConcat(root) 
{ //Accept stateler bulundu.
	root.isVisibility=true;
  if (root.accept == true) {
		root.accept=false;
		if(root.flink==null){
		root.flink=tempS.startState;
		root.fType='$';
		}
		else{
		root.slink=tempS.startState;
		root.sType='$';
		}
	}
	
	if (root.flink != null && root.flink.isVisibility==false && root.flink!=tempS.startState){
		searchConcat(root.flink);}
    if(root.slink != null && root.slink.isVisibility==false && root.slink!=tempS.startState){
	    searchConcat(root.slink); 
	}	
};

//////**************************/////////
//////**************************/////////

function create(postfix)                 //Postfix split edilerek gerekli fonksiyonlara gönderildi.
{
var e = postfix
e=e.split(' ')
for (var i in e) {
	var t=e[i];
	if (t!='*' && t!='+'&&t!='.' && t!=''){
		budget.push(createAdd(t));
	}
	else {
		switch (t) {
			case '+': 
		   	unionAdd();
           break;
		    case '*':
				starAdd();
			break;
			case '.': 
			concatAdd();
				
			break;
		}
	}
}
}
//////**************************/////////
function setAllflag(root)               //Tüm Node'ların gezinilebilirliği sıfırlandı.
{ 
	 root.isVisibility=false;
	 root.setStatus=dot; 	
	if (root.flink != null && root.flink.setStatus!=dot){
		setAllflag(root.flink);
	}
  if(root.slink != null && root.slink.setStatus!=dot){
	    setAllflag(root.slink); 
	}	

} ;

function iteration(userstring){         //İstenilen string split edildi ve sonuc gönderildi.
	dot++;
	setAllflag(nfa.startState);
	userstring=userstring.split('')
	Tnode=new Stack;
	Tbag=new Stack;
	Tnode.push(nfa.startState);
	
	for (var i in userstring) {
		dot++;
		 setAllflag(nfa.startState);
			checkChar=userstring[i];
	
			while(Tnode.peek()!=null){
				checkThepath(Tnode.pop());   
			}
				
			while(Tbag.peek()!=null)
			Tnode.push(Tbag.pop());
		}

		if(Tnode.peek()==null){window.alert('>>FALSE'); return;}
		else checkThepath(Tnode.peek());
		
		while(Tnode.peek()!=null){
			if(Tnode.pop().accept==true || controlFlag==true){
				 window.alert('>>TRUE');
				 return;
			}
		}
			 window.alert('>>FALSE');
	};
function checkThepath(temp)             // NFA makinesi üzerinde gezinilerek kontrol sağlandı.
{
	if( temp.flink!=null && temp.fType==checkChar && temp.flink.isVisibility==false){
		temp=temp.flink;
		temp.isVisibility=true;
		controlFlag=false;
		//checkThepath(temp);
		Tbag.push(temp);
	
	}
	else if( temp.slink!=null && temp.sType==checkChar && temp.slink.isVisibility==false){
		temp=temp.slink;
		temp.isVisibility=true;
		controlFlag=false;
		//checkThepath(temp);
		Tbag.push(temp);
	}
	else {
		  if (temp.flink != null && temp.fType=='$' && temp.flink.isVisibility==false){
				if(temp.flink.accept==true)
				{
					controlFlag=true;
				}
				temp.flink.isVisibility=true;
				checkThepath(temp.flink);
			}
			if(temp.slink != null && temp.sType=='$' && temp.slink.isVisibility==false){
				if(temp.slink.accept==true)
				{
					controlFlag=true;
				}
				temp.slink.isVisibility=true;
				checkThepath(temp.slink); 
			}	
		}
}
function TestNFA(regex,path){
	convert(regex)
	nfa=budget.pop();
 iteration(path);

}

//////**************************/////////
//////--------Control Part------/////////
//////**************************/////////
TestNFA('(a+b)*.c.a*','aaabc');
TestNFA('(a+b)*.c.a*','acabb');
TestNFA('b.a*+c*.(a.b*.a)','cccaa');
TestNFA('b.a*+c*.(a.b*.a)','bba');



