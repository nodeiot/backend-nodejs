IO.puts("Hello world from Elixir")
IO.puts(div(10, 2)) # divisao sem retorno de float, com retorno de float usar operador /
IO.puts(10 / 2) # divisao com float
IO.puts(rem(10, 3)) # resto de divisao sem float
IO.puts(div 9, 3) # permite nao usar parenteses quando chamar func

# binarios, octal, hex
IO.puts(0x15F)
IO.puts(0b100000)
IO.puts(0o740)

# floats
IO.puts(5.2)
IO.puts(1.0e-10)

# round and trunc
IO.puts(round 3.55)
IO.puts(trunc(3.55))

# type check
IO.puts(is_integer(1))
IO.puts(is_float(2.3))
IO.puts(is_number("a"))
IO.puts(false or is_boolean(true))

name = "Kaue Almeida"
age = 25
IO.puts("Hello! my name is #{name}\nI'm #{age} years old")
IO.puts("string " <> "concatenada")

IO.puts(is_binary(age))
IO.puts(byte_size(name))

IO.puts(String.length(name))


case {1, 2, 3} do
  {4, 5, 6} ->
    "This clause won't match"
  {1, x, 3} ->
    "This clause will match and bind x to 2 in this clause"
  _ ->
    "This clause would match any value"
end
"This clause will match and bind x to 2 in this clause"
