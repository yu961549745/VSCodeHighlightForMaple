(*
    Test file for highlight
*)
`&+`:=proc(x::set,y::set)
    return x union y;
end proc:               # keywords
$include "utils.mpl"    # preprocessor
solve(x^2+x-1);         # maple functions
print(`&+`);            # quoted name
print("123");           # string
print('x+y');           # unvaluated expression
type(x,uneval);         # type name
fun:=proc(x::uneval)    # parameter modifier
    option inline;      # proc and module options
    print(procname);    # language variable
    return true;        # language constants
end proc:
