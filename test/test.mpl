(*
    Test file for highlight
*)
`&+`:=proc(x::set,y::set)
    return x union y;
end proc:               # keywords
$include "utils.mpl"    # preprocessor
print(`&+`);            # quoted name
print("123");           # string
print('x+y');           # unvaluated expression
type(x,uneval);         # type name
fun:=proc(x::uneval)    # parameter modifier
    print(procname);    # language variable
    return true;        # language constants
end proc:

