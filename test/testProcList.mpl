Foo:=module()
    export fun1,fun2;
    `fun1`:=proc()
        fun11:=proc()
            
        end proc:
        return fun11;
    end proc:
    fun2:=proc()
        return module()            
        end module:
    end proc:
end module:

A[B]:=proc()
    
end proc:

A[1]:=proc()
    
end proc:

A["fadfa"]:=proc()
    
end proc:

:-C[D]:=proc()


end proc:

:-U['V']:=proc()
    
end proc:

A:-B:-C:=proc()
    
end proc:

U[V][W]:=proc()
    fadfa:=proc()
        
    end proc:
    
end proc:

jkladfjakdflkja:=proc()
    
end proc:

(*
    OptMethods.mpl
*)

# Maple 符号线性规划
Opt[SLP]:=proc(A,b)
    uses LinearAlgebra;
    local E,x,FF,AA,BB,m,n;
    n:=RowDimension(A);
    m:=ColumnDimension(A);
    E:=IdentityMatrix(n);
    FF:=Vector([[0$m][],[1$n][]]);
    AA:=<<A|-E>,<-A|-E>>;
    BB:=convert(<b,-b>,Vector);
    x:=Opt[Simplex](FF,AA,BB);
    x:=x[1..m];
    return x;
end proc:

# Maple 单纯形法矩阵接口
# min f*x
# A*x<=b
Opt[Simplex]:=proc(f,A,b)
    uses LinearAlgebra;
    local m,n,v,V,x,AA,CC;
    m:=RowDimension(A);
    n:=ColumnDimension(A);
    V:=Vector([seq(v[k],k=1..n)]);
    AA:=A.V;
    CC:=map(k->(AA[k]<=b[k]),{seq(1..m)});
    x:=simplex[minimize](f^%T.V,CC,UNRESTRICTED);
    x:=map(k->rhs(k),[x[]]);
    return Vector(x);
end proc:

# Maple 进行整数线性规划
Opt[NILP]:=proc(A,b)
    uses LinearAlgebra,Optimization;
    local E,x,FF,AA,BB,m,n;
    n:=RowDimension(A);
    m:=ColumnDimension(A);
    E:=IdentityMatrix(n);
    FF:=Vector([[0$m][],[1$n][]]);
    AA:=<<A|-E>,<-A|-E>>;
    # 根据帮助文档的说法，sparse 矩阵更快
    # 实际上并不是 -_-||
    # AA:=Matrix(AA,storage=sparse); 
    BB:=convert(<b,-b>,Vector);
    x:=LPSolve(FF,[AA,BB],integervariables=[seq(1..m)]);
    x:=map(round,x[2][1..m]);
    return x;
end proc:

# Matlab 整数线性规划
# 调用代价约为 0.02 秒
Opt[MatlabILP]:=proc(A,b)
    uses Matlab;
    local x;
    setvar("A",A);
    setvar("b",b);
    # 直接运行具体代码，避免产生路径问题
    evalM("[n,m]=size(A);E=eye(n);AA=[A,-E;-A,-E];BB=[b;-b];f=[zeros(m,1);ones(n,1)];x=intlinprog(f,1:m,AA,BB,[],[],[],[],optimoptions('intlinprog','Display','off'));x=x(1:m);");
    x:=getvar("x");
    if type(x,float) then
        x:=Vector([round(x)]);
    else
        x:=map(round,x);
    end if;
    return x;
end proc:

# Mathematica 符号线性规划
# 调用代价约为 0.7 秒
Opt[mmaSLP]:=proc(A,b)
    uses LinearAlgebra;
    local E,x,FF,AA,BB,m,n;
    n:=RowDimension(A);
    m:=ColumnDimension(A);
    E:=IdentityMatrix(n);
    FF:=Vector([[0$m][],[1$n][]]);
    AA:=<<A|-E>,<-A|-E>>;
    BB:=convert(<b,-b>,Vector);
    x:=Opt[mmaLP](FF,-AA,-BB);
    x:=x[1..m];
    return x;
end proc:

Opt[mmaLP]:=proc(f,A,b)
    uses FileTools;
    local cmd,fd,r;
    cmd:=sprintf("Print[LinearProgramming[%s,%s,%s,-Infinity,Method->\"Simplex\"]];",
        mmaVec(f),mmaMat(A),mmaVec(b));
    fd:=Text[Open]("LP.wl",create,overwrite);
    Text[WriteString](fd,cmd);
    Text[Close](fd);
    r:=ssystem("wolframscript -file LP.wl")[2];
    try
        r:=parse(cat("[",r[2..-2],"]"));
    catch :
        error r;
    finally
        Remove("LP.wl");
    end try;
    return Vector(r);# end proc
end proc:# proc

(*
mmaVec:=proc(x)
    uses StringTools;
    local k,n,buffer,fmt;
    n:=numelems(x);
    buffer:=StringBuffer();
    buffer:-clear();
    buffer:-append("{");
    for k from 1 to n do
        buffer:-append(sprintf("%d",x[k]));
        if k<n then
            buffer:-append(",");
        end if;
    end do;
    buffer:-append("}");
    return buffer:-value('clear');
end proc:
*)

# mmaMat:=proc(A)
#     uses LinearAlgebra,StringTools;
#     local k,m,buffer;
#     m:=RowDimension(A);
#     buffer:=StringBuffer();
#     buffer:-clear();
#     buffer:-append("{");
#     for k from 1 to m do
#         buffer:-append(mmaVec(A[k]));
#         if k<m then 
#             buffer:-append(",");
#         end if;
#     end do;
#     buffer:-append("}");
#     return buffer:-value('clear');
# end proc:


printf("\d \d \" fadfa hahah:=proc()end proc \" \"\"\n");
printf("hahah:=proc()end proc\n");

fadsfasdf:=proc()
    return proc()
        
    end proc
end proc: